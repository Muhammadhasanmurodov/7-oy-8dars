import { toast } from "sonner";

export function formError(data) {
    if (!data?.name) {
     return toast.error("Please enter your name!");
    }
    if (!data?.email) {
     return toast.error("Please enter your email!");
    }
    if (!data?.password) {
     return toast.error("Please enter your password!");
    }
    return null;
}


export function firebaseErrorMessage(error) {
  if (!error) return "Noma'lum xato yuz berdi";

  const match = error.match(/\(auth\/[^\)]+\)/);
  if(!match) return "Nimadur xato ketti. Iltimos qaytadan urining."
  const code = match[0].replace(/[()]/g, "")

  switch (code) {
    case "auth/email-already-in-use":
      return "Bu email bilan account allaqachon mavjud";
    case "auth/invalid-email":
      return "Email noto‘g‘ri kiritilgan";
    case "auth/weak-password":
      return "Parol juda kuchsiz (kamida 6 ta belgidan iborat bo‘lishi kerak)";
    case "auth/user-not-found":
      return "Bunday foydalanuvchi topilmadi";
    case "auth/wrong-password":
      return "Parol noto‘g‘ri kiritilgan";
     case "auth/invalid-credential":
      return "Parol yoki email noto‘g‘ri kiritilgan"
     case "auth/user-disabled":
     return "Sizni kirishingizga ruxsat berilmagan";
    default:
      return "Xatolik yuz berdi, qaytadan urinib ko‘ring";
  }
}
