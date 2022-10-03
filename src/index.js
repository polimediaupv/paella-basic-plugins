import dictionaries from './dictionaries';

import AudioSelectorButton from './plugins/es.upv.paella.audioSelector';
import BackwardButton from './plugins/es.upv.paella.backwardButtonPlugin';
import CaptionsSelectorButton from './plugins/es.upv.paella.captionsSelectorPlugin';
import DownloadsButton from './plugins/es.upv.paella.downloadsPlugin';
import FindCaptionsButton from './plugins/es.upv.paella.findCaptionsPlugin';
import ForwardButton from './plugins/es.upv.paella.forwardButtonPlugin';
import FullscreenButton from './plugins/es.upv.paella.fullscreenButton';
import KeyboardHelpButton from './plugins/es.upv.paella.keyboardShortcutsHelp';
import LayoutSelectorButton from './plugins/es.upv.paella.layoutSelector';
import PlaybackRateButton from './plugins/es.upv.paella.playbackRateButton';
import QualitySelectorButton from './plugins/es.upv.paella.qualitySelector';
import VolumeButton from './plugins/es.upv.paella.volumeButtonPlugin';
import CustomTimeProgressIndicator from './plugins/es.upv.paella.customTimeProgressIndicator';

export default function getBasicPluginsContext() {
    return require.context("./plugins", true, /\.js/)
}

export const basicPluginsDict = dictionaries;

export const AudioSelectorButtonPlugin = AudioSelectorButton;
export const BackwardButtonPlugin = BackwardButton;
export const CaptionsSelectorButtonPlugin = CaptionsSelectorButton;
export const DownloadsButtonPlugin = DownloadsButton;
export const FindCaptionsButtonPlugin = FindCaptionsButton;
export const ForwardButtonPlugin = ForwardButton;
export const FullscreenButtonPlugin = FullscreenButton;
export const KeyboardHelpButtonPlugin = KeyboardHelpButton;
export const LayoutSelectorButtonPlugin = LayoutSelectorButton;
export const PlaybackRateButtonPlugin = PlaybackRateButton;
export const QualitySelectorButtonPlugin = QualitySelectorButton;
export const VolumeButtonPlugin = VolumeButton;
export const CustomTimeProgressIndicatorPlugin = CustomTimeProgressIndicator;
