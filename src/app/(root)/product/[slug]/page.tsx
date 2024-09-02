import { DataProduct } from "@/interface";
import { rupiah } from "@/db/helpers/formatRupiah";
import { useEffect, useState } from "react";
import AddToWhistList from "../components/AddToWhistList";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

type Slug = {
  params: { slug: string };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await fetchData(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.name,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

const baseUrl = "http://localhost:3000";

const fetchData = async (slug: string) => {
  console.log(slug, "<<Slug Fetchdata");

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${slug}`,
      {
        method: "get",
      }
    );

    const responseBody = await response.json();
    console.log(responseBody, "<<<ResponseBody");

    if (!response.ok) {
      throw new Error("Error fatch product by slug");
    }

    return responseBody.product;
  } catch (error) {
    console.log(error);
  }
};

export default async function ListProduct({ params }: Slug) {
  const { slug } = params;

  let dataProduct: DataProduct = await fetchData(slug);

  return (
    <div className="w-full min-h-screen p-10 flex flex-col items-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="hero bg-slate-200 text-slate-700 p-10 m-20 rounded-xl border-0">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            alt="image1"
            src={`${dataProduct.thumbnail}`}
            className="max-w-sm rounded-lg shadow-2xl"
          />

          <div>
            <h1 className="text-5xl font-bold">{dataProduct.name}</h1>
            <p className="py-6">{dataProduct.description}</p>
            <h3 className=" text-2xl">Price : {rupiah(dataProduct.price)}</h3>

            <div className="card-actions justify-end">
              {dataProduct.tags.map((eltag: any, index) => {
                return (
                  <div
                    key={`${dataProduct._id}${index}`}
                    className="badge badge-outline"
                  >
                    {eltag}
                  </div>
                );
              })}
            </div>
            <AddToWhistList id={dataProduct?._id} />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-2 -mt-24 bg-slate-200 p-10 w-full">
        {dataProduct.images.map((image: string, index: number) => {
          return (
            <img
              alt="image2"
              key={index}
              src={`${image}`}
              className=" w-40 rounded-lg shadow-2xl"
            />
          );
        })}
      </div>
    </div>
  );
}
