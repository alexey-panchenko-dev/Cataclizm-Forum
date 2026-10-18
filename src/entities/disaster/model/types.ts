export type TimelineItem = {
  time: string;
  text: string;
};

export type DisasterEvent = {
  id: string;
  date: string;
  year: string;
  location: string;
  country: string;
  category: string;
  title: string;
  summary: string;
  description: string;
  sourceName: string;
  sourceUrl: string;
  timeline: TimelineItem[];
  creatorEmail?: string;
};
