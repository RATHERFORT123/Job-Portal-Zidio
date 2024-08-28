import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  // const JobId = "chetanrahtore";

  const dayago = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiffrence = currentTime - createdAt;
    const diffMinutes = timeDiffrence / (100 * 24 * 60 * 60);
    return Math.floor(diffMinutes);
  };
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {dayago(job?.createdAt) == 0
            ? "Today"
            : `${dayago(job?.createdAt)} day ago`}
        </p>
        {/* <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button> */}
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1>{job?.company?.name}</h1>
          <p className="text-sm text-gray-500"></p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description?.slice(0, 30)}...
        </p>
      </div>
      <div>
        <Badge className={"font-bold ml-1"}>{job?.position}Position</Badge>
        <Badge className={"font-bold ml-1"}>{job?.jobType}</Badge>
        <Badge className={"font-bold ml-1"}>{job?.salary} LPA</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/jobs/description/${job._id}`)}
          variant="outline"
        >
          Details
        </Button>
        {/* <Button>Save For Later</Button> */}
      </div>
    </div>
  );
};

export default Job;
