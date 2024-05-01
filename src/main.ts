figma.currentPage.selection.forEach((node) => {
  if (node.type === "FRAME") {
    const width = node.width;
    const height = node.height;
    const childPositions = node.children.reduce<[SceneNode, number, number][]>(
      (acc, child) => {
        if (typeof child !== "number") {
          acc.push([child, child.x, child.y]);
        }
        return acc;
      },
      []
    );
    // Set autolayout properties on selected node
    node.layoutMode = "VERTICAL";
    node.primaryAxisAlignItems = "CENTER";
    node.counterAxisAlignItems = "CENTER";
    // Set to fixed width/height, resize to original dimensions
    node.layoutSizingVertical = "FIXED";
    node.layoutSizingHorizontal = "FIXED";
    node.resize(width, height);
    // Reposition each child vector absolutely to original coordinates
    childPositions.forEach(([child, x, y]) => {
      if (child.type === "VECTOR") {
        child.layoutPositioning = "ABSOLUTE";
        child.x = x;
        child.y = y;
      }
    });
  }
});

figma.closePlugin();
