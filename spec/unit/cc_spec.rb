require 'logger'
require_relative '../spec_helper'

describe AdminUI::CC do
  include ThreadHelper

  let(:ccdb_file)  { '/tmp/admin_ui_ccdb.db' }
  let(:ccdb_uri)   { "sqlite://#{ ccdb_file }" }
  let(:db_file)    { '/tmp/admin_ui_store.db' }
  let(:db_uri)     { "sqlite://#{ db_file }" }
  let(:log_file)   { '/tmp/admin_ui.log' }
  let(:logger)     { Logger.new(log_file) }
  let(:uaadb_file) { '/tmp/admin_ui_uaadb.db' }
  let(:uaadb_uri)  { "sqlite://#{ uaadb_file }" }
  let(:config) do
    AdminUI::Config.load(ccdb_uri:             ccdb_uri,
                         cloud_controller_uri: 'http://api.localhost',
                         db_uri:               db_uri,
                         uaadb_uri:            uaadb_uri,
                         uaa_client:           { id: 'id', secret: 'secret' })
  end
  let(:client) { AdminUI::CCRestClient.new(config, logger) }
  let(:cc) { AdminUI::CC.new(config, logger, client) }

  before do
    AdminUI::Config.any_instance.stub(:validate)
  end

  after do
    kill_threads

    Process.wait(Process.spawn({}, "rm -fr #{ ccdb_file } #{ db_file } #{ log_file } #{ uaadb_file }"))
  end

  context 'No backend connected' do
    def verify_disconnected_items(result)
      expect(result).to include('connected' => false, 'items' => [])
    end

    it 'returns zero applications as expected' do
      verify_disconnected_items(cc.applications)
    end

    it 'returns nil application count as expected' do
      expect(cc.applications_count).to be_nil
    end

    it 'returns nil application running instances as expected' do
      expect(cc.applications_running_instances).to be_nil
    end

    it 'returns nil application totals instances as expected' do
      expect(cc.applications_total_instances).to be_nil
    end

    it 'returns zero apps_routes as expected' do
      verify_disconnected_items(cc.apps_routes)
    end

    it 'returns zero clients as expected' do
      verify_disconnected_items(cc.clients)
    end

    it 'returns zero domains as expected' do
      verify_disconnected_items(cc.domains)
    end

    it 'returns zero events as expected' do
      verify_disconnected_items(cc.events)
    end

    it 'returns zero group_membership expected' do
      verify_disconnected_items(cc.group_membership)
    end

    it 'returns zero groups as expected' do
      verify_disconnected_items(cc.groups)
    end

    it 'returns zero organizations as expected' do
      verify_disconnected_items(cc.organizations)
    end

    it 'returns zero organizations_auditors as expected' do
      verify_disconnected_items(cc.organizations_auditors)
    end

    it 'returns nil organizations count as expected' do
      expect(cc.organizations_count).to be_nil
    end

    it 'returns zero organizations_billing_managers as expected' do
      verify_disconnected_items(cc.organizations_billing_managers)
    end

    it 'returns zero organizations_managers as expected' do
      verify_disconnected_items(cc.organizations_managers)
    end

    it 'returns zero organizations_private_domains as expected' do
      verify_disconnected_items(cc.organizations_private_domains)
    end

    it 'returns zero organizations_users as expected' do
      verify_disconnected_items(cc.organizations_users)
    end

    it 'returns zero quota_definitions as expected' do
      verify_disconnected_items(cc.quota_definitions)
    end

    it 'returns zero routes as expected' do
      verify_disconnected_items(cc.routes)
    end

    it 'returns zero service_bindings as expected' do
      verify_disconnected_items(cc.service_bindings)
    end

    it 'returns zero service_brokers as expected' do
      verify_disconnected_items(cc.service_brokers)
    end

    it 'returns zero service_instances as expected' do
      verify_disconnected_items(cc.service_instances)
    end

    it 'returns zero service_keys as expected' do
      verify_disconnected_items(cc.service_keys)
    end

    it 'returns zero service_plans as expected' do
      verify_disconnected_items(cc.service_plans)
    end

    it 'returns zero service_plan_visibilities as expected' do
      verify_disconnected_items(cc.service_plan_visibilities)
    end

    it 'returns zero services as expected' do
      verify_disconnected_items(cc.services)
    end

    it 'returns zero spaces as expected' do
      verify_disconnected_items(cc.spaces)
    end

    it 'returns zero spaces_auditors as expected' do
      verify_disconnected_items(cc.spaces_auditors)
    end

    it 'returns nil spaces count as expected' do
      expect(cc.spaces_count).to be_nil
    end

    it 'returns zero spaces_developers as expected' do
      verify_disconnected_items(cc.spaces_developers)
    end

    it 'returns zero spaces_managers as expected' do
      verify_disconnected_items(cc.spaces_managers)
    end

    it 'returns zero users_cc as expected' do
      verify_disconnected_items(cc.users_cc)
    end

    it 'returns nil users count as expected' do
      expect(cc.users_count).to be_nil
    end

    it 'returns zero users_uaa as expected' do
      verify_disconnected_items(cc.users_uaa)
    end
  end
end
