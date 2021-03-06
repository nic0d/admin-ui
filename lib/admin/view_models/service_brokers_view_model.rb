require_relative 'base'
require 'date'
require 'thread'

module AdminUI
  class ServiceBrokersViewModel < AdminUI::Base
    def initialize(logger, cc)
      super(logger)

      @cc = cc
    end

    def do_items
      service_brokers   = @cc.service_brokers

      # service_brokers have to exist.  Other record types are optional
      return result unless service_brokers['connected']

      events                    = @cc.events
      service_bindings          = @cc.service_bindings
      service_instances         = @cc.service_instances
      service_keys              = @cc.service_keys
      service_plans             = @cc.service_plans
      service_plan_visibilities = @cc.service_plan_visibilities
      services                  = @cc.services

      events_connected                    = events['connected']
      service_bindings_connected          = service_bindings['connected']
      service_instances_connected         = service_instances['connected']
      service_keys_connected              = service_keys['connected']
      service_plans_connected             = service_plans['connected']
      service_plan_visibilities_connected = service_plan_visibilities['connected']
      services_connected                  = service_plans['connected']

      service_hash          = Hash[services['items'].map { |item| [item[:id], item] }]
      service_instance_hash = Hash[service_instances['items'].map { |item| [item[:id], item] }]
      service_plan_hash     = Hash[service_plans['items'].map { |item| [item[:id], item] }]

      event_counters = {}
      events['items'].each do |event|
        Thread.pass
        if event[:actee_type] == 'service_broker'
          actee = event[:actee]
          event_counters[actee] = 0 if event_counters[actee].nil?
          event_counters[actee] += 1
        elsif event[:actor_type] == 'service_broker'
          actor = event[:actor]
          event_counters[actor] = 0 if event_counters[actor].nil?
          event_counters[actor] += 1
        end
      end

      service_counters = {}
      services['items'].each do |service|
        Thread.pass
        service_broker_id = service[:service_broker_id]
        next if service_broker_id.nil?
        service_counters[service_broker_id] = 0 if service_counters[service_broker_id].nil?
        service_counters[service_broker_id] += 1
      end

      service_plan_counters = {}
      service_plans['items'].each do |service_plan|
        Thread.pass
        service = service_hash[service_plan[:service_id]]
        next if service.nil?
        service_broker_id = service[:service_broker_id]
        next if service_broker_id.nil?
        service_plan_counters[service_broker_id] = 0 if service_plan_counters[service_broker_id].nil?
        service_plan_counters[service_broker_id] += 1
      end

      service_plan_visibility_counters = {}
      service_plan_visibilities['items'].each do |service_plan_visibility|
        Thread.pass
        service_plan_id = service_plan_visibility[:service_plan_id]
        next if service_plan_id.nil?
        service_plan = service_plan_hash[service_plan_id]
        next if service_plan.nil?
        service = service_hash[service_plan[:service_id]]
        next if service.nil?
        service_broker_id = service[:service_broker_id]
        next if service_broker_id.nil?
        service_plan_visibility_counters[service_broker_id] = 0 if service_plan_visibility_counters[service_broker_id].nil?
        service_plan_visibility_counters[service_broker_id] += 1
      end

      service_instance_counters = {}
      service_instances['items'].each do |service_instance|
        Thread.pass
        service_plan_id = service_instance[:service_plan_id]
        next if service_plan_id.nil?
        service_plan = service_plan_hash[service_plan_id]
        next if service_plan.nil?
        service = service_hash[service_plan[:service_id]]
        next if service.nil?
        service_broker_id = service[:service_broker_id]
        next if service_broker_id.nil?
        service_instance_counters[service_broker_id] = 0 if service_instance_counters[service_broker_id].nil?
        service_instance_counters[service_broker_id] += 1
      end

      service_binding_counters = {}
      service_bindings['items'].each do |service_binding|
        Thread.pass
        service_instance_id = service_binding[:service_instance_id]
        next if service_instance_id.nil?
        service_instance = service_instance_hash[service_instance_id]
        next if service_instance.nil?
        service_plan_id = service_instance[:service_plan_id]
        next if service_plan_id.nil?
        service_plan = service_plan_hash[service_plan_id]
        next if service_plan.nil?
        service = service_hash[service_plan[:service_id]]
        next if service.nil?
        service_broker_id = service[:service_broker_id]
        next if service_broker_id.nil?
        service_binding_counters[service_broker_id] = 0 if service_binding_counters[service_broker_id].nil?
        service_binding_counters[service_broker_id] += 1
      end

      service_key_counters = {}
      service_keys['items'].each do |service_key|
        Thread.pass
        service_instance_id = service_key[:service_instance_id]
        next if service_instance_id.nil?
        service_instance = service_instance_hash[service_instance_id]
        next if service_instance.nil?
        service_plan_id = service_instance[:service_plan_id]
        next if service_plan_id.nil?
        service_plan = service_plan_hash[service_plan_id]
        next if service_plan.nil?
        service = service_hash[service_plan[:service_id]]
        next if service.nil?
        service_broker_id = service[:service_broker_id]
        next if service_broker_id.nil?
        service_key_counters[service_broker_id] = 0 if service_key_counters[service_broker_id].nil?
        service_key_counters[service_broker_id] += 1
      end

      items = []
      hash  = {}

      service_brokers['items'].each do |service_broker|
        Thread.pass

        guid                            = service_broker[:guid]
        id                              = service_broker[:id]
        event_counter                   = event_counters[guid]
        service_binding_counter         = service_binding_counters[id]
        service_counter                 = service_counters[id]
        service_instance_counter        = service_instance_counters[id]
        service_key_counter             = service_key_counters[id]
        service_plan_counter            = service_plan_counters[id]
        service_plan_visibility_counter = service_plan_visibility_counters[id]

        row = []

        row.push(guid)
        row.push(service_broker[:name])
        row.push(guid)
        row.push(service_broker[:created_at].to_datetime.rfc3339)

        if service_broker[:updated_at]
          row.push(service_broker[:updated_at].to_datetime.rfc3339)
        else
          row.push(nil)
        end

        if event_counter
          row.push(event_counter)
        elsif events_connected
          row.push(0)
        else
          row.push(nil)
        end

        if service_counter
          row.push(service_counter)
        elsif services_connected
          row.push(0)
        else
          row.push(nil)
        end

        if service_plan_counter
          row.push(service_plan_counter)
        elsif service_plans_connected && services_connected
          row.push(0)
        else
          row.push(nil)
        end

        if service_plan_visibility_counter
          row.push(service_plan_visibility_counter)
        elsif service_plan_visibilities_connected && service_plans_connected && services_connected
          row.push(0)
        else
          row.push(nil)
        end

        if service_instance_counter
          row.push(service_instance_counter)
        elsif service_instances_connected && service_plans_connected && services_connected
          row.push(0)
        else
          row.push(nil)
        end

        if service_binding_counter
          row.push(service_binding_counter)
        elsif service_bindings_connected && service_instances_connected && service_plans_connected && services_connected
          row.push(0)
        else
          row.push(nil)
        end

        if service_key_counter
          row.push(service_key_counter)
        elsif service_keys_connected && service_instances_connected && service_plans_connected && services_connected
          row.push(0)
        else
          row.push(nil)
        end

        items.push(row)

        hash[guid] = service_broker
      end

      result(true, items, hash, (1..11).to_a, (1..4).to_a)
    end
  end
end
