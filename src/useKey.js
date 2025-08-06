import { useEffect } from "react";
export function useKey(keyWord, func) {
  useEffect(
    function () {
      function callBack(e) {
        if (e.key.toLowerCase() === keyWord.toLowerCase()) {
          func();
        }
      }
      document.addEventListener("keydown", callBack);

      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [func, keyWord]
  );
}
