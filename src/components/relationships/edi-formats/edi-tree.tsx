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
  const { data: versions, isLoading: isLoadingVersions } =
    useGetVersionByFormat(selectedFormat || "");

  const data: TreeDataItem[] = [
    {
      id: "1",
      name: "Item 1",
      children: [
        {
          id: "2",
          name: "Item 1.1",
          children: [
            {
              id: "3",
              name: "Item 1.1.1",
            },
            {
              id: "4",
              name: "Item 1.1.2",
            },
          ],
        },
        {
          id: "5",
          name: "Item 1.2 (disabled)",
          disabled: true,
        },
      ],
    },
    {
      id: "6",
      name: "Item 2 (draggable)",
      draggable: true,
    },
  ];

  return (
    <TreeView
      data={data}
      onClick={(e) => {
        console.log(e.target);
      }}
    />
  );
};
