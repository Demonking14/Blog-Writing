import { useEffect, useCallback } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select } from "../index";
import { useSelector } from "react-redux";
import services from "../../Appwrite/conf";
import RTE from '../RTE';
function Postform(post) {
  const { register, handleSubmit, getValues, setValue, watch } = useForm();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    if (data) {
      const file = data.image[0]
        ? await services.uploadFile(data.image[0])
        : null;

      if (file) {
        services.deleteFile(data.featuredimage);
      }
      const dbpost = await services.updateDocument(post.$id, {
        ...data,
      });
      if(dbpost){
        navigate(`/post/${post.$id}`);
      }
    }
    else{
      const file = data.image[0]? await services.uploadFile(data.image) : null
      if(file){
        const fileid = file.$id
        data.featuredimage = fileid;
      }
      const dbpost = await services.createDocument({...data , userid:userData.$id})
      if (dbpost) {
        navigate(`/post/${dbpost.$id}`);
    }


    }
  };

  const slugTransform = useCallback((value) => {
    if(value && typeof value === 'string'){
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
    }


  } , [])

  useEffect(() => {
    const subscription = watch((value , {name})=>{
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
    }
});

return () => subscription.unsubscribe();
    

  } , [watch , navigate , slugTransform]
)
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  );
}

export default Postform;
