import { useEndorsementStore } from '@/stores';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import ChatBubbleBottomCenterTextIcon from '@heroicons/react/24/outline/ChatBubbleBottomCenterTextIcon';

type CommentCardProps = {
  close: () => void;
};

export const CommentCard = ({ close }: CommentCardProps) => {
  const { comment, changeComment } = useEndorsementStore((state) => ({
    comment: state.comment,
    changeComment: state.changeComment,
  }));

  return (
    <div className="w-full bg-primary-50 p-4 rounded-xl">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-1">
          <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-primary" />
          <div className="text-thin text-gray-600 text-sm">Add comment</div>
        </div>
        <Button
          onMouseDown={() => {
            changeComment('');
            close();
          }}
          variant="ghost"
          size="icon"
        >
          <X className="w-6 h-6 text-primary" />
        </Button>
      </div>
      <div className="mt-4">
        <div className="flex w-full">
          <input
            type="text"
            placeholder={'Enter your comment...'}
            className="flex-1 text-2xl text-ellipsis font-semibold bg-transparent focus:outline-none"
            value={comment}
            onChange={(e) => changeComment(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
