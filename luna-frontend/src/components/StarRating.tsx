import { forwardRef } from "react";
import { StarRating as OriginalStarRating } from "star-ratings-react";

interface StarRatingProps {
  maxRating: number;
  rating: number;
  onSetRating: (arg: number) => void;
}
// eslint-disable-next-line react/display-name
const StarRating = forwardRef((props: StarRatingProps, ref) => (
  <OriginalStarRating {...props} ref={ref} />
));

export default StarRating;
