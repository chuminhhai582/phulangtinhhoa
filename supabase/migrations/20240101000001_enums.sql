create type user_role         as enum ('admin','coordinator','designer','qc','export','accountant','artisan','customer');
create type household_status  as enum ('prospect','surveyed','signed','active','paused','exited');
create type kiln_type         as enum ('cui','gas','dien','bau','khac');
create type design_status     as enum ('draft','in_review','approved','retired');
create type tolerance_class   as enum ('bat_buoc','co_dung_sai','doc_ban');
create type inquiry_decision  as enum ('pending','accept','park','reject');
create type quote_status      as enum ('draft','sent','accepted','rejected','expired');
create type order_status      as enum ('co_design','quoted','contracted','sample_approved','assigned',
                                       'in_production','qc_hold','packing','ready_to_ship','shipped',
                                       'delivered','closed','on_hold','cancelled');
create type batch_status      as enum ('planned','forming','drying','glazing','firing','cooling','sorted','done','cancelled');
create type qc_checkpoint     as enum ('pre_production','pre_firing','post_firing','pre_packing','pre_shipping');
create type qc_result         as enum ('pass','conditional','fail');
create type nc_cause          as enum ('design','material','forming','firing','packing','transport','expectation');
create type nc_decision       as enum ('rework','remake','downgrade','refund','accept_conditional','scrap');
create type milestone_kind    as enum ('deposit','pre_shipment','balance','design_fee','sample_fee');
create type milestone_status  as enum ('pending','invoiced','paid','overdue','waived');
create type payout_status     as enum ('planned','due','paid','confirmed');
create type sample_status     as enum ('requested','quoted','paid','making','shipped','approved','rejected','cancelled');
create type interview_stage   as enum ('problem','offer_test','paid_sample','pilot_order');
create type party_type        as enum ('household','third_party','platform','designer');
