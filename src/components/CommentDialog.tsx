import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "@/hooks/use-toast";
import { MessageSquareIcon, StarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { getInterviewerInfo } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

const CommentDialog = ({ interviewId }: { interviewId: Id<"interviews"> }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("1");

  const addComment = useMutation(api.comments.addComment);
  const users = useQuery(api.users.getUsers);
  const existingComments = useQuery(api.comments.getComments, { interviewId });

  const handleSubmit = async () => {
    if (!comment.trim()) {
      return toast({ variant: "destructive", title: "Please enter comment" });
    }

    try {
      await addComment({
        interviewId,
        content: comment.trim(),
        rating: parseInt(rating),
      });

      toast({ title: "Comment submitted" });
      setComment("");
      setRating("3");
      setIsOpen(false);
    } catch {
      toast({ variant: "destructive", title: "Failed to sumbit comment" });
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((value) => (
        <StarIcon
          key={value}
          className={`size-4 ${value <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  );

  if (existingComments === undefined || users === undefined) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          <MessageSquareIcon className="size-4 mr-2" />
        </Button>
      </DialogTrigger>

      {/* Content */}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Interview Comment</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {existingComments.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Previous Comments</h4>
                <Badge variant="outline">
                  {existingComments.length} Comment
                  {existingComments.length > 1 ? "s" : ""}
                </Badge>
              </div>
              {/* Display existing comments */}
              <ScrollArea className="h-[240px]">
                <div className="space-y-4">
                  {existingComments.map((comment, index) => {
                    const interviewer = getInterviewerInfo(
                      users,
                      comment.interviewerId
                    );
                    return (
                      <div
                        key={index}
                        className="rounded-lg border p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={interviewer.image} />
                              <AvatarFallback>
                                {interviewer.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {interviewer.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(
                                  comment._creationTime,
                                  "MMM d, yyyy • h:mm a"
                                )}
                              </p>
                            </div>
                          </div>
                          {renderStars(comment.rating)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {comment.content}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          )}
          <div className="space-y-4">
            {/* RATING */}
            <div className="space-y-2">
              <Label>Rating</Label>
              <Select value={rating} onValueChange={setRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <SelectItem key={value} value={value.toString()}>
                      <div className="flex items-center gap-2">
                        {renderStars(value)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* COMMENT */}
            <div className="space-y-2">
              <Label>Your Comment</Label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your detailed comment about the candidate..."
                className="h-32"
              />
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
