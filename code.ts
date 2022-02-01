const main = async () => {
  const paintStyles = figma.getLocalPaintStyles();
  const nodes: SceneNode[] = [];

  await figma.loadFontAsync({
    family: "Roboto",
    style: "Regular",
  });

  paintStyles.map((paint, i) => {
    const ellipse = figma.createEllipse();
    ellipse.y = i * 60;
    ellipse.resize(50, 50);
    ellipse.fillStyleId = paint.id;
    ellipse.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    ellipse.strokeWeight = 4;
    ellipse.name = paint.name;

    const text = figma.createText();
    text.x = 60;
    text.y = ellipse.y + 25 - text.height / 2;
    text.name = paint.name;
    text.characters = paint.name;

    figma.currentPage.appendChild(ellipse);
    figma.currentPage.appendChild(text);

    nodes.push(ellipse);
    nodes.push(text);
  });

  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);

  figma.notify(`✅ Created ${paintStyles.length} items from color styles`);
};

main().then(() => {
  figma.closePlugin();
});
