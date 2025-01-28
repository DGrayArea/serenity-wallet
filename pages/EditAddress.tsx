import backgroundSvg from "../assets/background.svg";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BackHeader from "@/components/BackHeader";
import { useState } from "react";
import DeleteDialog from "@/components/DeleteDialog";
import { Wallet } from "./AddressBook";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(1, "Field Cann't be Empty"),
  address: z.string().min(1, "Field Cann't be Empty"),
});
type FormData = z.infer<typeof formSchema>;

interface DeleteAddressProps {
  id?: number;
}

export default function EditAddress({ }: DeleteAddressProps) {
  const [deleteDialog, setDeleteDialo] = useState(false);
  const data: Wallet = {
    name: "My Primary Wallet",
    address: "0x1234567890abcdef1234567890abcdef12345678",
  };
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      address: data.address,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const navigate = useNavigate();

  const onSubmit = (updatedData: Wallet) => {
    console.log("updatedData", updatedData);
    navigate(-1);
  };
  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} title="Add Address" />
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="h-auto">
          <div className="flex-row h-full">
            <div className="w-full p-4 ">
              <input
                id="name"
                type="text"
                {...register("name")}
                placeholder="Name"
                className="w-full h-14 bg-[#FFFFFF50] p-4 rounded-lg file:bg-[#FFFFFF50]"
              />
              {errors.name && (
                <p className="text-[12px] text-red-700 ">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="w-full p-4 ">
              <input
                id="address"
                type="text"
                {...register("address")}
                placeholder="Wallet Address"
                className="w-full h-14 bg-[#FFFFFF50] p-4 rounded-lg file:bg-[#FFFFFF50]"
              />
              {errors.address && (
                <p className="text-[12px] text-red-700 ">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div className=" flex gap-2 p-4 mt-auto h-full items-end justify-end">
              <button
                type="button"
                className="w-full h-10 rounded-full bg-[#FF4231] text-[#FFFFFF] font-semibold"
                onClick={() => setDeleteDialo(true)}
              >
                Remove
              </button>
              <button
                className=" w-full h-10 rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[#FFFFFF] font-semibold"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
      <DeleteDialog
        isOpen={deleteDialog}
        onClose={() => setDeleteDialo(false)}
        title="Delete Address?"
      />
    </div>
  );
}
