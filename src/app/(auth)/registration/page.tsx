import InputField from "@/components/registration/inputField";
import Image from "next/image";
import RegisterImg from "@/assets/register/register.png";

export default function Registration() {
  return (
    <>
      <div className="bg-[#F1F4F8] px-4 py-16">
        <div className="flex justify-center items-center gap-10">
          <div className="hidden md:flex">
            <Image
              src={RegisterImg}
              alt="Login illustration"
              className="object-contain"
            />
          </div>
          {/* right side */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1F1F1F] text-center">
              Sign Up
            </h1>

            <p className="text-gray-500 text-center mb-12  text-sm md:text-base">
              To Create Account, Please Fill in the Form Below
            </p>

            {/* Input field */}
            <InputField />
          </div>
        </div>
      </div>
    </>
  );
}
