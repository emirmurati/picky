import {
  HeartIcon,
  CheckIcon,
  PencilIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Authentic Reviews",
    description:
      "All our reviews come from real customers, ensuring you get genuine feedback on every restaurant. No spam, just real opinions.",
    icon: CheckIcon,
  },
  {
    name: "Easy Review Submission",
    description:
      "Submit your dining experiences effortlessly with our user-friendly review submission tool. Share your story, rate your experience, and help others find the perfect spot.",
    icon: PencilIcon,
  },
  {
    name: "Engage with the Community",
    description:
      "Join our community of food lovers! Comment on reviews, ask questions, and connect with fellow diners to make the best restaurant choices.",
    icon: ChatBubbleBottomCenterIcon,
  },
  {
    name: "Personalized Recommendations",
    description:
      "Get personalized restaurant recommendations based on your tastes and preferences. We help you find the perfect place for any occasion.",
    icon: HeartIcon,
  },
];

export default function Features() {
  return (
    <div className="bg-white py-2 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <h2 className="text-3xl font-bold lg:leading-relaxed tracking-tight text-gray-900 sm:text-4xl">
            Why Choose PickyEater?
          </h2>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
                    <feature.icon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
