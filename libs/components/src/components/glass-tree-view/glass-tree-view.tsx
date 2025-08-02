import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
} from "lucide-react";
import React from "react";
import {
  cn,
  getGlassClass,
  microInteraction,
} from "../../core/utils/classname";

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: Array<TreeNode>;
  selectable?: boolean;
  defaultExpanded?: boolean;
  data?: unknown;
}

interface GlassTreeViewProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: Array<TreeNode>;
  onNodeSelect?: (node: TreeNode) => void;
  onNodeExpand?: (_node: TreeNode, _expanded: boolean) => void;
  selectedNodeId?: string;
  expandedNodeIds?: Array<string>;
  showIcons?: boolean;
  indentSize?: number;
}

export const GlassTreeView: React.FC<GlassTreeViewProps> = ({
  nodes,
  onNodeSelect,
  onNodeExpand,
  selectedNodeId,
  expandedNodeIds: controlledExpandedIds,
  showIcons = true,
  indentSize = 20,
  className,
  ...props
}) => {
  const [internalExpandedIds, setInternalExpandedIds] = React.useState<
    Set<string>
  >(() => {
    const initial = new Set<string>();
    const _collectDefaultExpanded = (nodes: Array<TreeNode>) => {
      nodes.forEach((node) => {
        if (node.defaultExpanded) {
          initial.add(node.id);
        }
        if (node.children) {
          _collectDefaultExpanded(node.children);
        }
      });
    };
    _collectDefaultExpanded(nodes);
    return initial;
  });

  const expandedIds = controlledExpandedIds
    ? new Set(controlledExpandedIds)
    : internalExpandedIds;

  const toggleExpanded = (node: TreeNode) => {
    const isExpanded = expandedIds.has(node.id);

    if (!controlledExpandedIds) {
      setInternalExpandedIds((prev) => {
        const next = new Set(prev);
        if (isExpanded) {
          next.delete(node.id);
        } else {
          next.add(node.id);
        }
        return next;
      });
    }

    onNodeExpand?.(node, !isExpanded);
  };

  const renderNode = (node: TreeNode, level = 0): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedIds.has(node.id);
    const isSelected = selectedNodeId === node.id;

    const getNodeIcon = () => {
      if (node.icon) return node.icon;
      if (!showIcons) return null;

      if (hasChildren) {
        return isExpanded ? (
          <FolderOpen className="h-4 w-4" />
        ) : (
          <Folder className="h-4 w-4" />
        );
      }
      return <File className="h-4 w-4" />;
    };

    return (
      <div key={node.id}>
        <div
          className={cn(
            "flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1",
            "hover:bg-white/5",
            microInteraction.interactive,
            isSelected &&
              cn(
                getGlassClass("default"),
                "border border-blue-500/30 bg-blue-500/10",
              ),
          )}
          style={{ paddingLeft: `${level * indentSize + 8}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(node);
            }
            if (node.selectable !== false) {
              onNodeSelect?.(node);
            }
          }}
          role="treeitem"
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-selected={isSelected}
        >
          {hasChildren && (
            <_span _className="text-[var(--text-secondary)]">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </_span>
          )}

          {showIcons && (
            <span className="text-[var(--text-secondary)]">
              {getNodeIcon()}
            </span>
          )}

          <span className="flex-1 text-[var(--text-primary)]">
            {node.label}
          </span>
        </div>

        {hasChildren && isExpanded && (
          <div className="slide-in-from-top-1 animate-in">
            {node.children?.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn("rounded-lg p-2", getGlassClass("default"), className)}
      role="tree"
      {...props}
    >
      {nodes.map((node) => renderNode(node))}
    </div>
  );
};
