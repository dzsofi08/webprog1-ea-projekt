
class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.element = document.createElement('div');
  }

  render() {
    this.element.style.position = 'absolute';
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.backgroundColor = this.color;
    this.element.style.transition = 'all 0.5s ease'; 
    
    document.body.appendChild(this.element);
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}

class Circle extends Shape {
  constructor(x, y, radius, color) {
    super(x, y, color); 
    this.radius = radius;
  }

  render() {
    this.element.style.width = `${this.radius * 2}px`;
    this.element.style.height = `${this.radius * 2}px`;
    this.element.style.borderRadius = '50%'; 
    super.render(); 
  }
}


class Square extends Shape {
  constructor(x, y, size, color) {
    super(x, y, color);
    this.size = size;
  }

  render() {
    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
    super.render();
  }
}


window.addEventListener('DOMContentLoaded', () => {
  const btn = document.createElement('button');
  btn.textContent = 'Új alakzat generálása';
  btn.style.cssText = 'padding: 10px 20px; font-size: 16px; margin: 0 20px; cursor: pointer;';
  document.body.appendChild(btn);

  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22'];

  btn.addEventListener('click', () => {
    const isCircle = Math.random() > 0.5;
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 150) + 100;
    const size = Math.random() * 50 + 20;
    const color = colors[Math.floor(Math.random() * colors.length)];

    
    const shape = isCircle ? new Circle(x, y, size, color) : new Square(x, y, size * 2, color);
    
    
    shape.render();
  });
});
