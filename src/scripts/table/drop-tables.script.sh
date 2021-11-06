#!/bin/bash
( exec "src/scripts/table/users/drop-users-table.script.sh" )
( exec "src/scripts/table/users/drop-role-permissions-table.script.sh" )
( exec "src/scripts/table/users/drop-permissions-table.script.sh" )
( exec "src/scripts/table/users/drop-roles-table.script.sh" )
( exec "src/scripts/table/products/drop-category-values-table.script.sh" )
( exec "src/scripts/table/products/drop-category-characteristics-table.script.sh" )
( exec "src/scripts/table/products/drop-categories-table.script.sh" )
( exec "src/scripts/table/products/drop-product-characteristics-table.script.sh" )
( exec "src/scripts/table/products/drop-product-images-table.script.sh" )
( exec "src/scripts/table/products/drop-products-table.script.sh" )
( exec "src/scripts/table/drop-transactions-table.script.sh" )
( exec "src/scripts/table/drop-feedbacks-table.script.sh" )
( exec "src/scripts/table/drop-regions-table.script.sh" )
( exec "src/scripts/table/drop-order-items-table.script.sh" )
( exec "src/scripts/table/drop-orders-table.script.sh" )
( exec "src/scripts/table/drop-shops-table.script.sh" )