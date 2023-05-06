import { useEffect } from "react";

export default function Bookmarked() {
  useEffect(() => {
    return () => console.log("hi");
  }, []);

  return <div>Hi</div>;
}
