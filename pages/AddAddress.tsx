import backgroundSvg from "../assets/background.svg";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import BackHeader from "@/components/BackHeader";
import { Wallet } from "./AddressBook";

const formSchema = z.object({
  name: z.string().min(1, "Field Cann't be Empty"),
  address: z.string().min(1, "Field Cann't be Empty"), 
});
type FormData = z.infer<typeof formSchema>;

export default function AddAddress() {
  const form = useForm<FormData>({ resolver: zodResolver(formSchema) });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const handelNavigate = () => {
    navigate(-1);
  };

  const onSubmit = (updatedData: Wallet) => {
    console.log("updatedData", updatedData);
    navigate(-1);
  };
  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} title="Add Address" />
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className=" flex gap-2 p-4  h-[360px] items-end justify-end">
              <button
                className="border w-full h-10 rounded-full bg-[#FFFFFF10] text-[#FFFFFF] font-semibold"
                onClick={handelNavigate}
              >
                Cancle
              </button>
              <button
                className=" w-full h-10 rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[#FFFFFF] font-semibold"
                type="submit"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
