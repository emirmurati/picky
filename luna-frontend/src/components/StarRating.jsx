import { forwardRef } from "react";
import { StarRating as OriginalStarRating } from "star-ratings-react";

// eslint-disable-next-line react/display-name
const StarRating = forwardRef((props, ref) => (
  <OriginalStarRating {...props} ref={ref} />
));

export default StarRating;
