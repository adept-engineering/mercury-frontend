import { TreeDataItem, TreeView } from "@/components/tree-view";
import { useGetAllFormats, useGetVersionByFormat } from "@/hooks/use-nlp";
import { useQueryState } from "nuqs";

export const EdiTree = () => {
  const [selectedFormat, setSelectedFormat] = useQueryState("format");
  const [selectedVersion, setSelectedVersion] = useQueryState("version");
  const [selectedTransactionSet, setSelectedTransactionSet] =
    useQueryState("transactionSet");
  const [selectedSegment, setSelectedSegment] = useQueryState("segment");
  const { data: formats } = useGetAllFormats();
  const { data: versions } = useGetVersionByFormat(selectedFormat || "");

  const data: TreeDataItem[] =
    formats?.map((format) => ({
      id: format.Agency,
      name: format.Description,
      children:
        versions?.map((version: { Version: string }) => ({
          id: `${format.Agency}-${version.Version}`,
          name: version.Version,
        })) || [],
    })) || [];

  return (
    <TreeView
      data={data}
      onSelectChange={(item) => {
        if (item?.id.includes("-")) {
          const [format, version] = item.id.split("-");
          setSelectedFormat(format);
          setSelectedVersion(version);
        } else {
          setSelectedFormat(item?.id ?? "");
        }
      }}
    />
  );
};
