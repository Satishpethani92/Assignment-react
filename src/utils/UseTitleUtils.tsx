import { useEffect } from "react";

export function useTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    let documentTitle = title;
    if (documentTitle.trim() != "") {
      documentTitle = documentTitle + " | insite.work";
    } else {
      documentTitle = "insite.work";
    }
    document.title = documentTitle;
    return () => {
      document.title = prevTitle;
    };
  });
}
