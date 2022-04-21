import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../../Firebase/Firebase-config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "./../../../hooks/useAuth";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const bookmarkCollectionRef = collection(db, "bookmarks");
  const navigate = useNavigate();
  const { user } = useAuth();
  const q = query(collection(db, "cities"), where("capital", "==", true));

  useEffect(() => {
    const getBookmarks = async () => {
      const arr = [];

      const q = query(
        collection(db, "bookmarks"),
        where("userid", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
      });
      setBookmarks(arr);

      //   const data = await getDocs(bookmarkCollectionRef);
      //   // console.log(data);
      //   setBookmarks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getBookmarks();
  }, []);
  console.log(bookmarks);
  return (
    <div>
      {bookmarks.map((bookmark) => {
        return (
          <div className="pt-10 mx-5 ">
            <a href={bookmark.bookmarks} target="_blank" className="text-sm ">
              {bookmark.bookmarks}
            </a>
            {/* <button> {bookmark.bookmarks}</button> */}
          </div>
        );
      })}
    </div>
  );
};

export default Bookmarks;
