import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addReview,
  fetchReviews,
  selectReview,
} from "../Redux/slices/reviewSlice";

const ReviewCard = ({ review }) => (
  <li className="mb-4 p-4 bg-white rounded-md shadow-md">
    <div className="flex items-start">
      <div className="mr-4">
        <FaUser className="h-8 w-8 max-w-full flex-shrink-0 rounded-full align-middle text-red-300" />
      </div>
      <div>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star, index) => (
            <svg
              key={index}
              className={`h-6 w-6 align-middle ${
                index < review.rating ? "text-yellow-500" : "text-gray-400"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                className=""
              ></path>
            </svg>
          ))}
        </div>
        <p className="mt-5 text-base text-gray-900">{review.reviewText}</p>
        <p className="mt-5 text-sm font-bold text-gray-900">
          {review.user.username}
        </p>
        <p className="mt-1 text-sm text-gray-600">
          {new Date(review.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  </li>
);

const Review = ({ productId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReview);
  useEffect(() => {
    dispatch(fetchReviews(productId));
    console.log(reviews);
  }, [dispatch, productId]);
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(0);

  const handleReviewSubmit = async () => {
    console.log(localStorage.getItem('token'));
    if (!localStorage.getItem("token")) {
      toast.error('Please login to write a review');
      return;
    }
    try {
      dispatch(
        addReview({ productId, reviewText: userReview, rating: userRating })
      );
      toast.success("Review added successfully");
      dispatch(fetchReviews(productId));
      setUserReview("");
      setUserRating(0);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Product Reviews</h2>

      {/* Display previous reviews */}
      <div>
        <ul>
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </ul>
      </div>

      {/* Write a new review */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Write a Review</h3>

        <textarea
          rows="4"
          cols="50"
          value={userReview}
          onChange={(e) => setUserReview(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <h3 className="text-lg font-semibold mb-2">Rating</h3>
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`h-8 w-8 cursor-pointer ${
                star <= userRating ? "text-yellow-500" : "text-gray-400"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => setUserRating(star)}
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                className=""
              ></path>
            </svg>
          ))}
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-700"
          onClick={handleReviewSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Review;
