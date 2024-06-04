import { Typography } from "@material-tailwind/react";
 
export function DefaultSkeleton() {
  return (
    <div className="m-auto w-max animate-pulse h-70vh py-10">
      <Typography
        as="div"
        variant="h1"
        className="mb-8 h-6 w-72 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-6 h-4 w-96 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-6 h-4 w-96 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-6 h-4 w-96 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-6 h-4 w-96 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-6 h-4 w-96 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-6 h-4 w-96 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-6 h-4 w-96 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-6 h-4 w-96 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
    </div>
  );
}