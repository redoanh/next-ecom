import { redirect } from "next/navigation";

const HomePage = () => {
  // return redirect('/super_admin/login')
  return redirect('/super_admin/books_bd/pos')
  // return redirect('/super_admin/company-setting/company-store/store-user-mapping')
};

export default HomePage;