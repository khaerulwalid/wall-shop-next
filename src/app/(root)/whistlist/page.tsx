"use client";

import { useEffect, useState } from "react";
import { ResponseMyWhistlist, MyWhistlist } from "@/interface";
import { rupiah } from "@/db/helpers/formatRupiah";
import RemoveWhistlist from "./components/RemoveWhistList";
import Image from "next/image";
const baseUrl = "http://localhost:3000";

export default function Whistlist() {
  const [whistlist, setWhistList] = useState<ResponseMyWhistlist>();

  const fetchData = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/whistlist",
        {
          method: "get",
        }
      );

      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error("Fetch Error");
      }

      setWhistList(responseBody);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <div>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage:
              "url(https://img.freepik.com/free-photo/female-friends-out-shopping-together_53876-25041.jpg?t=st=1709735310~exp=1709738910~hmac=1ba36850a7d3ba4071b073a5268f8e8ccd2382e1440515ff46043e60ed6e517d&w=900)",
          }}
        >
          <div className="overflow-x-auto bg-slate-800 w-[95%] rounded-xl">
            <table className="table">
              {/* head */}
              <thead className=" bg-green-800 text-slate-300 text-xl">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {whistlist?.data?.map((el: MyWhistlist) => {
                  return (
                    <tr key={el._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={el.productDetail[0].thumbnail}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {el.productDetail[0].name}
                            </div>
                            <div className="text-sm opacity-50 flex flex-row">
                              <p>__</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {el.productDetail[0].excerpt}
                        <br />
                        <div className="flex flex-row gap-1">
                          {el.productDetail[0].tags.map(
                            (tag: string, i: number) => {
                              return (
                                <span
                                  key={i}
                                  className="badge badge-ghost badge-sm"
                                >
                                  {tag}
                                </span>
                              );
                            }
                          )}
                        </div>
                      </td>
                      <td>{rupiah(el.productDetail[0].price)}</td>
                      <th>
                        <RemoveWhistlist setWhistList={fetchData} id={el._id} />
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
