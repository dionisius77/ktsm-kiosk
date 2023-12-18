import { MessageServices } from '_services/message-api.services';
import { useMutation } from 'react-query';

const useMessagelMutation = () => {
  const readMessage = useMutation(MessageServices.readMessage);

  return { readMessage };
};

export default useMessagelMutation;
