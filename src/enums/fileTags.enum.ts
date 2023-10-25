import FileStatus from "./fileStatus.enum";

const FileTags = {
	DeleteTag: `<Tagging><TagSet><Tag><Key>status</Key><Value>${FileStatus.Delete}</Value></Tag></TagSet></Tagging>`,
} as const;

export default FileTags;
