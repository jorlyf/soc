import { useSelector } from "react-redux";
import { isEmpty } from "../utilities/checks";

// modal windows
import ContentViewer from './ContentViewer';
import FileLoader from "./FileLoader";
import Notifications from './Notifications';
import ConfirmWindow from "./ConfirmWindow";

export default function ModalWindows() {
  const CONTENT_VIEWER_DATA = useSelector(state => state.modalWindows.CONTENT_VIEWER_DATA);
  const FILE_LOADER_DATA = useSelector(state => state.modalWindows.FILE_LOADER_DATA);
  const NOTIFICATIONS_DATA = useSelector(state => state.modalWindows.NOTIFICATIONS_DATA);
  const CONFIRM_WINDOW_DATA = useSelector(state => state.modalWindows.CONFIRM_WINDOW_DATA);

  return (
    <>
      {!isEmpty(NOTIFICATIONS_DATA) && <Notifications data={NOTIFICATIONS_DATA} />}
      {CONTENT_VIEWER_DATA.isVisible && <ContentViewer data={CONTENT_VIEWER_DATA} />}
      {FILE_LOADER_DATA.isVisible && <FileLoader data={FILE_LOADER_DATA} />}
      {CONFIRM_WINDOW_DATA.isVisible && <ConfirmWindow data={CONFIRM_WINDOW_DATA}/>}
    </>
  )
}