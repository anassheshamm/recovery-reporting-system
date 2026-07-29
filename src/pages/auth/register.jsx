import {
  Mail,
  Phone,
  UserRound,
  Lock,
  CreditCard,
  Globe,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Logo from "../../components/auth/Logo";
import SectionHeader from "../../components/auth/SectionHeader";

import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import PasswordInput from "../../components/common/PasswordInput";
import Button from "../../components/common/Button";

const schema = z
  .object({
    firstName: z.string().min(2, "الاسم مطلوب"),

    lastName: z.string().min(2, "اسم العائلة مطلوب"),

    nationality: z.string().min(1, "اختر الجنسية"),

    nationalId: z.string().min(14, "رقم الهوية غير صحيح"),

    phone: z.string().min(11, "رقم الهاتف غير صحيح"),

    email: z.string().email("بريد إلكتروني غير صحيح"),

    password: z.string().min(8, "٨ أحرف على الأقل"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "كلمتا المرور غير متطابقتين",
  });

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFF] py-10">
      <div className="mx-auto max-w-7xl px-8">

        {/* Logo */}

       
          <Logo />
       

        {/* Title */}

        <div className="mb-14 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900">
            إنشاء حساب جديد
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            الرجاء تسجيل البيانات للمتابعة
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-4xl space-y-14"
        >

          {/* Personal */}

          <section>

            <SectionHeader
              title="التعريف الشخصي"
              icon={<CreditCard size={22} />}
            />

            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2">

              <Select
                label="الجنسية"
                icon={<Globe size={18} />}
                options={[
                  "مصري",
                  "سعودي",
                  "إماراتي",
                  "أردني",
                ]}
                error={errors.nationality?.message}
                {...register("nationality")}
              />

              <Input
                label="رقم الهوية"
                placeholder="ادخل رقم الهوية"
                icon={<CreditCard size={18} />}
                error={errors.nationalId?.message}
                {...register("nationalId")}
              />

              <Input
                label="الاسم الأول"
                placeholder="ادخل اسمك"
                icon={<UserRound size={18} />}
                error={errors.firstName?.message}
                {...register("firstName")}
              />

              <Input
                label="اسم العائلة"
                placeholder="ادخل اسم العائلة"
                icon={<UserRound size={18} />}
                error={errors.lastName?.message}
                {...register("lastName")}
              />

            </div>

          </section>

          {/* Contact */}

          <section>

            <SectionHeader
              title="معلومات التواصل"
              icon={<Mail size={22} />}
            />

            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2">

              <Input
                label="رقم الهاتف"
                placeholder="+20 1234567890"
                icon={<Phone size={18} />}
                error={errors.phone?.message}
                {...register("phone")}
              />

              <Input
                label="البريد الإلكتروني"
                placeholder="your.email@example.com"
                icon={<Mail size={18} />}
                error={errors.email?.message}
                {...register("email")}
              />

            </div>

          </section>

          {/* Password */}

          <section>

            <SectionHeader
              title="تعيين الرقم السري"
              icon={<Lock size={22} />}
            />

            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2">

              <PasswordInput
                label="الرقم السري"
                error={errors.password?.message}
                {...register("password")}
              />

              <PasswordInput
                label="اعادة ادخال الرقم السري"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

            </div>

          </section>

          <div className="pt-2">

            <Button
              type="submit"
              className="h-14 rounded-2xl text-lg"
            >
              تسجيل الدخول
            </Button>

          </div>

        </form>
      </div>
    </main>
  );
}