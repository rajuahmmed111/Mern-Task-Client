import { Card, CardContent } from "../ui/card";
import InputField from "./inputField";

export default function Registration() {
  return (
    <>
      <div className="bg-[#100C73] h-[60px]"></div>

      <div className="bg-[#F1F4F8] px-4 py-16">
        <div className="flex justify-center items-center">
          <div className="max-w-[720px]  mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-black text-center mb-6">
              Register now and elevate your experience
            </h1>

            <p className="text-black text-center mb-12  text-sm md:text-base">
              &quot;Sign up today to unlock exclusive features and take your
              experience to the next level with enhanced tools and personalized
              options.&quot;
            </p>

            {/* form card */}
            <div>
              <Card className="rounded-3xl overflow-hidden md:px-10">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-semibold text-center mb-8">
                    Registration
                  </h2>

                  {/* form in input field */}
                  <InputField />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
