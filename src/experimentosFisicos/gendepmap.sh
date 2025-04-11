#!/bin/bash

FILENAME='mapaDependencias.txt';

listarDependenciasDiretorioCorrente()
{
  echo -e "MAPA DE DEPENDÊNCIAS\n" > $FILENAME;
  for fonte in ./*.js ; do
    echo -e "$fonte";
    grep 'import' $fonte;
    echo -e '\n';
  done >> ./$FILENAME;
}

listarDependenciasDiretorioCorrente;
cd ./classes;
listarDependenciasDiretorioCorrente;
exit;
