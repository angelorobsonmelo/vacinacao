/**
 * Created by angelorobson on 25/10/15.
 */
(function () {

    'use strict';

    app.controller('VacinaUsuarioCtrl', ['$scope', 'VacinaUsuarioFactory', '$rootScope', '$mdDialog', '$location', function ($scope, VacinaUsuarioFactory, $rootScope, $mdDialog, $location) {

        $rootScope.activetab = $location.path();

        $rootScope.mostrarMenuEscolhido = function() {

            $rootScope.tgState = false;

        }

        $rootScope.esconderHeader = false;
        $rootScope.titulo = 'Cartão de Vacina';

        listarTodasPorSequencialUsuario();

        function listarTodasPorSequencialUsuario() {

            VacinaUsuarioFactory.listarTodasPorSequencialUsuario().then(function(resposta) {

                var vacinasUsuarioCopy = angular.copy(resposta);

                $scope.vacinasUsuario = vacinasUsuarioCopy;

                console.log($scope.vacinasUsuario);


            });
        }


        $scope.adicionarVacinaUsuario = function(ev) {

            var vacinaUsuario = '';

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'partials/vacina-usuario/modals/salvar-vacina-usuario.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                resolve: {
                    vacinaUsuario: function () {
                        return vacinaUsuario;
                    }
                }
            })



        }


        $scope.remover = function(vacinaUsuario) {

            VacinaUsuarioFactory.remover(vacinaUsuario).then(function(resposta) {

                if(resposta[0].resultado == 'OK'){

                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('Aviso!')
                            .content('Excluído com Sucesso!')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')

                    );

                    listarTodasPorSequencialUsuario();

                }

            });
        }


        $scope.editar = function(vacinaUsuario, ev) {

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'partials/vacina-usuario/modals/salvar-vacina-usuario.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                resolve: {
                    vacinaUsuario: function () {
                        return vacinaUsuario;
                    }
                }
            });

        }

        function DialogController($scope, $mdDialog, $location, VacinaUsuarioFactory, vacinaUsuario) {

            $scope.vacinaUsuario = vacinaUsuario;

            $scope.salvarVacinaUsuario = function() {


                VacinaUsuarioFactory.salvarVacinaUsuario($scope.vacinaUsuario).then(function(data) {

                    if(data[0].resultado == 'OK'){

                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.body))
                                .title('Aviso!')
                                .content('Salvo com Sucesso!')
                                .ariaLabel('Alert Dialog Demo')
                                .ok('OK')

                        );

                        listarTodasPorSequencialUsuario();
                        $mdDialog.hide();
                    }

                });



            }

            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }





    }]);

}());