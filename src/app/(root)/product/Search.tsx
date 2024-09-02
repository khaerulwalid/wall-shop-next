import { error } from "console";
import { ReactPropTypes, useEffect, useState } from "react";
import { Product } from "@/interface";
import _debounce from "lodash/debounce";
import useDebounce from "../../../../hooks/useDebounce";

const baseUrl = "http://localhost:3000";

export default function Search(props: {
  changeProduct: (args: Product) => void;
}) {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const debounceSearch = useDebounce(input, 500);

  useEffect(() => {
    async function searchData() {
      setLoading(true);

      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/search/${debounceSearch}`,
        {
          method: "get",
        }
      );

      const responseBody = await response.json();
      console.log(responseBody, "<<<ResponBody");

      if (!response.ok) {
        throw new Error("Fetch Error");
      }

      props.changeProduct(responseBody);
      setLoading(false);
    }

    if (debounceSearch) {
      searchData();
    }
  }, [debounceSearch]);

  return (
    <div className="flex flex-row gap-4 justify-center">
      <input
        type="text"
        value={input}
        placeholder="Type here"
        className="input input-bordered input-accent w-full max-w-xs bg-slate-200 text-slate-800 border-0"
        onChange={handleChange}
      />
    </div>
  );
}
