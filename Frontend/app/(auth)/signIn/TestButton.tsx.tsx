"use client";

import { Button } from "@/components/ui/button";
import { testFetchData } from "@/lib/test/testFetchData";

const TestButton = () => {
  return (
    <Button
      className="w-full"
      variant="outline"
      onClick={() => {
        console.log("Button clicked");
        console.log(testFetchData());
      }}
    >
      Test Button
    </Button>
  );
};

export { TestButton };
