
import { Poppins } from "next/font/google";
import Nav from "./Nav";



const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400"],
  });
const AdminLayout = ({children}) => {
  return (
    <div className={`${poppins.className} flex`}>
      <div>
        <Nav/>
      </div>

      <div className="mt-[100px] w-screen pr-8">{children}</div>
    </div>
  )
}

export default AdminLayout
