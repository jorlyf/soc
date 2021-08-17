import { useSelector } from "react-redux";

// modal windows
import ContentViewer from './ContentViewer';
import FileLoader from "./FileLoader";
import InputField from "./InputField";
import Notifications from './Notifications';

export default function ModalWindows() {
  const CONTENT_VIEWER_DATA = useSelector(state => state.modalWindows.CONTENT_VIEWER_DATA);
  const FILE_LOADER_DATA = useSelector(state => state.modalWindows.FILE_LOADER_DATA);
  const INPUT_FIELD_DATA = useSelector(state => state.modalWindows.INPUT_FIELD_DATA);
  const NOTIFICATIONS_DATA = useSelector(state => state.modalWindows.NOTIFICATIONS_DATA);

  return (
    <>
      {CONTENT_VIEWER_DATA.isVisible && <ContentViewer data={CONTENT_VIEWER_DATA} />}
      {FILE_LOADER_DATA.isVisible && <FileLoader data={FILE_LOADER_DATA} />}
      {INPUT_FIELD_DATA.isVisible && <InputField data={INPUT_FIELD_DATA} />}
      {NOTIFICATIONS_DATA.isVisible && <Notifications data={NOTIFICATIONS_DATA} />}
    </>
  )
}