import { useEffect, useState } from "react";
import { DataProduct } from "@/interface";
import Link from "next/link";
import { RequiresLogin } from "../login/RequiresLogin";
import AddToWhistList from "./product/components/AddToWhistList";
import Image from "next/image";

const baseUrl = "http://localhost:3000";

const fetchProducts = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/pagination/1",
    {
      method: "get",
    }
  );

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error("Fetch Error");
  }

  return responseBody;
};

export default async function Home() {
  let products = await fetchProducts();

  products = products?.data?.slice(0, 5);

  const image1: string =
    "https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg";

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <div className="absolute w-[90%] mt-[68px] left-[50%] -translate-x-[50%]">
        <div className="carousel w-full rounded-br-3xl rounded-b-3xl flex items-center justify-center mx-auto">
          <div id="item1" className="carousel-item w-full h-[300px]">
            <img alt="image1" src={image1} className="w-full object-cover" />
          </div>
        </div>
      </div>
      <div>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage:
              "url(https://img.freepik.com/free-photo/female-friends-out-shopping-together_53876-25041.jpg?t=st=1709735310~exp=1709738910~hmac=1ba36850a7d3ba4071b073a5268f8e8ccd2382e1440515ff46043e60ed6e517d&w=900)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>

          <div className="hero-content text-center text-neutral-content">
            <div className="mt-[450px] mb-10 p-4">
              <h1 className="mb-5 text-5xl font-bold">Hello Gaez</h1>
              <p className="mb-5">
                Traktir pengguna baru dengan mendapatkan diskon berlimpat
                menjaga ketebalan dompet.
              </p>
              <Link href="/product" className="btn btn-success  mb-20">
                Mulai Belanja
              </Link>

              {/* Card */}

              <div className="flex gap-4 justify-center">
                {products?.map((el: DataProduct) => {
                  return (
                    <div
                      key={el._id}
                      className="card shadow-xl bg-slate-300 text-slate-900"
                    >
                      <figure>
                        <img
                          src={el.thumbnail}
                          alt="Shoes"
                          className=" h-[250px] object-cover"
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title h-12 mb-3">{el.name}</h2>
                        <AddToWhistList id={el._id} />
                        <p>{el.excerpt}</p>
                        <div className="card-actions justify-end">
                          {el.tags.map((eltag: any, index) => {
                            return (
                              <div
                                key={`${el._id}${index}`}
                                className="badge badge-outline"
                              >
                                {eltag}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <button className="btn btn-success glass text-slate-800">
                        <Link href={`/product/${el.slug}`}>See detail</Link>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* End Card */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
