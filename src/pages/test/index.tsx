import type { NextPage } from "next";
import Link from "next/link";

const Test: NextPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div>
        <Link href="/paygateway?name=producto 1&image=https://sc04.alicdn.com/kf/Uc0b56e875b04467aa767dda132693ee5V.jpg&amount=80.333333333333333333333333333333333&num=1&tax=5&logotype=https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/07/Pepsi_logo_emblem_logotype-2.png?auto=format&q=60&fit=max&w=930&key=VphD_VwHLWU27VioQYOIByBnamY4wa-G8oEKDVs8kW3E&reason=prueba&order=001&timer=2.15">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            Primera compra
          </a>
        </Link>
        <Link href="/paygateway?name=producto 1&image=https://sc04.alicdn.com/kf/Uc0b56e875b04467aa767dda132693ee5V.jpg&amount=80&num=5&name=producto 2&image=https://sc04.alicdn.com/kf/Uc0b56e875b04467aa767dda132693ee5V.jpg&amount=90&num=2&name=producto 2&image=https://sc04.alicdn.com/kf/Uc0b56e875b04467aa767dda132693ee5V.jpg&amount=90&num=2&name=producto 1&image=https://sc04.alicdn.com/kf/Uc0b56e875b04467aa767dda132693ee5V.jpg&amount=80&num=5&name=producto 2&image=https://sc04.alicdn.com/kf/Uc0b56e875b04467aa767dda132693ee5V.jpg&amount=90&num=2&name=producto 2&image=https://sc04.alicdn.com/kf/Uc0b56e875b04467aa767dda132693ee5V.jpg&amount=90&num=2&tax=5&logotype=https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Songkick_logotype.svg/1280px-Songkick_logotype.svg.png">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Segunda compra
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Test;
