class Arrow {
  constructor(fromElement, toImage, xRatio, yRatio) {
    ({ p0x: this.p0x, p0y: this.p0y } = this.getP0(fromElement));
    ({ p3x: this.p3x, p3y: this.p3y } = this.getP3(toImage, xRatio, yRatio));
    ({
      p1x: this.p1x,
      p1y: this.p1y,
      p2x: this.p2x,
      p2y: this.p2y,
    } = this.getP1P2(this.p0x, this.p0y, this.p3x, this.p3y));
  }

  getP0(fromElement) {
    let { right, left, bottom } = fromElement.getBoundingClientRect();
    [right, left, bottom] = [right, left, bottom].map((v) => Math.round(v));

    return {
      p0x: Math.round((left + right) / 2),
      p0y: bottom,
    };
  }

  getP3(toImage, xRatio, yRatio) {
    let { right, left, top, bottom } = toImage.getBoundingClientRect();
    [right, left, top, bottom] = [right, left, top, bottom].map((v) =>
      Math.round(v)
    );

    const p3x = Math.round((right - left) * xRatio + left);
    const p3y = Math.round((bottom - top) * yRatio + top);

    return { p3x, p3y };
  }

  getP1P2(p0x, p0y, p3x, p3y) {
    const screenHeight = window.innerHeight;
    const p1YOffset = Math.round(screenHeight / 3);
    const p2offsetRadius = Math.round(screenHeight / 5);
    const p2XOffset = p2offsetRadius * Math.round(Math.cos(31));
    const p2YOffset = p2offsetRadius * Math.round(Math.sin(31));

    return {
      p1x: p0x,
      p1y: p0y + p1YOffset,
      p2x: p3x - p2XOffset,
      p2y: p3y + p2YOffset,
    };
  }
}
