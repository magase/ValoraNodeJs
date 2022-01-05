var botonMarcar1 = document.getElementById('marcar1'),
    botonDesmarcar1 = document.getElementById('desmarcar1'),
    circulo1 = document.getElementById('li1'),

    botonMarcar2 = document.getElementById('marcar2'),
    botonDesmarcar2 = document.getElementById('desmarcar2'),
    circulo2 = document.getElementById('li2'),

    botonMarcar3 = document.getElementById('marcar3'),
    botonDesmarcar3 = document.getElementById('desmarcar3'),
    circulo3 = document.getElementById('li3'),

    botonMarcar4 = document.getElementById('marcar4'),
    botonDesmarcar4 = document.getElementById('desmarcar4'),
    circulo4 = document.getElementById('li4')
    
  

    botonDesmarcar1.addEventListener('click', function(){
        circulo1.classList.remove('event1');
        circulo1.classList.add('event');
    });
    botonDesmarcar2.addEventListener('click', function(){
        circulo2.classList.remove('event1');
        circulo2.classList.add('event');
    });
    botonDesmarcar3.addEventListener('click', function(){
        circulo3.classList.remove('event1');
        circulo3.classList.add('event');
    });
    botonDesmarcar4.addEventListener('click', function(){
        circulo4.classList.remove('event1');
        circulo4.classList.add('event');
    });
 

botonMarcar1.addEventListener('click', function(){
    circulo1.classList.remove('event');
    circulo1.classList.add('event1');
});
botonMarcar2.addEventListener('click', function(){
    circulo2.classList.remove('event');
    circulo2.classList.add('event1');
});
botonMarcar3.addEventListener('click', function(){
    circulo3.classList.remove('event');
    circulo3.classList.add('event1');
});
botonMarcar4.addEventListener('click', function(){
    circulo4.classList.remove('event');
    circulo4.classList.add('event1');
});

