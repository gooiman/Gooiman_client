export interface TopicState {
  mainTopic: string;
  selectedColor: string;
  showDropdown: boolean;
  selectedTopicBlock: { color: string; text: string } | null;
}
