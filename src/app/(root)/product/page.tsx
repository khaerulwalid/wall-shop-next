"use client";

import { DataProduct } from "@/interface";
import { SetStateAction, useEffect, useState } from "react";
import { Product } from "@/interface";
import Search from "./Search";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProductDetail } from "@/interface";
import Image from "next/image";
const baseUrl = "http://localhost:3000";

interface ProductResponse {
  statusCode: number;
  data: any[];
  length: number;
}

export default function Product() {
  const [product, setProduct] = useState<
    SetStateAction<ProductResponse | object>
  >({
    statusCode: 200,
    data: [],
    length: 0,
  });

  const [idParams, setIdParams] = useState<SetStateAction<number>>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [search, setSearch] = useState<boolean>(false);
  // const [cards, setCards] = useState([])

  const fetchProducts = async () => {
    setIdParams((prevPage: number) => prevPage + 1);

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/pagination/${idParams}`,
      {
        method: "get",
      }
    );

    const responseBody = await response.json();

    console.log(responseBody);

    if (!response.ok) {
      throw new Error("Fetch Error");
    }

    setProduct((prevProduct: ProductResponse) => {
      return {
        statusCode: responseBody.statusCode,
        data: [...prevProduct.data, ...responseBody.data],
        length: responseBody.length,
      };
    });

    if ("data" in product) {
      if (product.data.length === responseBody.length) {
        setHasMore(false);
      }
    }
  };

  const changeProduct = (value: Product) => {
    setSearch(true);
    setProduct(value);
  };

  const image1: string =
    "https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg";

  if (!("data" in product)) {
    return <p>Loading Initial Product...</p>;
  }

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
          <div className="absolute top-16 w-full mb-10 p-4">
            <Search changeProduct={changeProduct} />
          </div>
          <InfiniteScroll
            dataLength={product.data.length}
            next={fetchProducts}
            hasMore={hasMore}
            loader={<h4>Loading Next...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {/* Card */}
            <div className="mt-[200px] flex flex-row gap-6 flex-wrap justify-center">
              {product.data.map((el: DataProduct) => {
                return (
                  <div
                    key={el._id}
                    className="card card-compact w-96 bg-base-100 shadow-xl"
                  >
                    <figure>
                      <img
                        className="h-[350px] object-cover"
                        src={`${el.thumbnail}`}
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{el.name}</h2>
                      <p>{el.excerpt}</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">
                          <Link href={`/product/${el.slug}`}>See detail</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* End Card */}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
