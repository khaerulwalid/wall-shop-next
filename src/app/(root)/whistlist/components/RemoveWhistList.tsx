"use client";
import { useRouter } from "next/navigation";

import { ActionRemoveWhistlist } from "./ActionRemoveWhistlist";

const baseUrl = "http://localhost:3000";

export default function RemoveWhistlist(props: {
  id: string;
  setWhistList: () => Promise<void>;
}) {
  const navigation = useRouter();
  const triggerFunction = async () => {
    await ActionRemoveWhistlist(props.id);
    props.setWhistList();
  };

  return (
    <form action={() => triggerFunction()}>
      <button type="submit" className="btn btn-warning btn-xs">
        Remove
      </button>
    </form>
  );
}
