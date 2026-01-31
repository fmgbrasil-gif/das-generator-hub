export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      accounting_entries: {
        Row: {
          amount: number | null
          company_id: string | null
          created_at: string | null
          credit_account_code: string | null
          date: string | null
          debit_account_code: string | null
          description: string | null
          id: string
          is_reconciled: boolean | null
          operation: string | null
          status: string | null
        }
        Insert: {
          amount?: number | null
          company_id?: string | null
          created_at?: string | null
          credit_account_code?: string | null
          date?: string | null
          debit_account_code?: string | null
          description?: string | null
          id?: string
          is_reconciled?: boolean | null
          operation?: string | null
          status?: string | null
        }
        Update: {
          amount?: number | null
          company_id?: string | null
          created_at?: string | null
          credit_account_code?: string | null
          date?: string | null
          debit_account_code?: string | null
          description?: string | null
          id?: string
          is_reconciled?: boolean | null
          operation?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounting_entries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      acordo_parcelas: {
        Row: {
          acordo_id: string
          created_at: string
          data_pagamento: string | null
          data_vencimento: string
          id: string
          numero_parcela: number
          status: string
          updated_at: string
          valor_pago: number | null
          valor_parcela: number
        }
        Insert: {
          acordo_id: string
          created_at?: string
          data_pagamento?: string | null
          data_vencimento: string
          id?: string
          numero_parcela: number
          status?: string
          updated_at?: string
          valor_pago?: number | null
          valor_parcela: number
        }
        Update: {
          acordo_id?: string
          created_at?: string
          data_pagamento?: string | null
          data_vencimento?: string
          id?: string
          numero_parcela?: number
          status?: string
          updated_at?: string
          valor_pago?: number | null
          valor_parcela?: number
        }
        Relationships: [
          {
            foreignKeyName: "acordo_parcelas_acordo_id_fkey"
            columns: ["acordo_id"]
            isOneToOne: false
            referencedRelation: "acordos_negociacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      acordo_titulos: {
        Row: {
          acordo_id: string
          baixado_omie: boolean
          created_at: string
          data_baixa_omie: string | null
          id: string
          numero_documento: string | null
          titulo_codigo: number
          valor_titulo: number
        }
        Insert: {
          acordo_id: string
          baixado_omie?: boolean
          created_at?: string
          data_baixa_omie?: string | null
          id?: string
          numero_documento?: string | null
          titulo_codigo: number
          valor_titulo: number
        }
        Update: {
          acordo_id?: string
          baixado_omie?: boolean
          created_at?: string
          data_baixa_omie?: string | null
          id?: string
          numero_documento?: string | null
          titulo_codigo?: number
          valor_titulo?: number
        }
        Relationships: [
          {
            foreignKeyName: "acordo_titulos_acordo_id_fkey"
            columns: ["acordo_id"]
            isOneToOne: false
            referencedRelation: "acordos_negociacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      acordos_negociacoes: {
        Row: {
          cliente_codigo: number
          cliente_nome: string | null
          created_at: string
          created_by: string | null
          data_acordo: string
          id: string
          observacoes: string | null
          qtd_parcelas: number
          status: string
          updated_at: string
          valor_acordado: number
          valor_desconto: number
          valor_divida_original: number
          valor_entrada: number
          valor_parcela: number
          valor_saldo: number
        }
        Insert: {
          cliente_codigo: number
          cliente_nome?: string | null
          created_at?: string
          created_by?: string | null
          data_acordo?: string
          id?: string
          observacoes?: string | null
          qtd_parcelas?: number
          status?: string
          updated_at?: string
          valor_acordado: number
          valor_desconto?: number
          valor_divida_original: number
          valor_entrada?: number
          valor_parcela?: number
          valor_saldo: number
        }
        Update: {
          cliente_codigo?: number
          cliente_nome?: string | null
          created_at?: string
          created_by?: string | null
          data_acordo?: string
          id?: string
          observacoes?: string | null
          qtd_parcelas?: number
          status?: string
          updated_at?: string
          valor_acordado?: number
          valor_desconto?: number
          valor_divida_original?: number
          valor_entrada?: number
          valor_parcela?: number
          valor_saldo?: number
        }
        Relationships: []
      }
      activity_log: {
        Row: {
          action: string
          actor_source: string
          actor_user_id: string | null
          client_id: string | null
          created_at: string
          external_event_id: string | null
          id: string
          payload: Json
        }
        Insert: {
          action: string
          actor_source?: string
          actor_user_id?: string | null
          client_id?: string | null
          created_at?: string
          external_event_id?: string | null
          id?: string
          payload?: Json
        }
        Update: {
          action?: string
          actor_source?: string
          actor_user_id?: string | null
          client_id?: string | null
          created_at?: string
          external_event_id?: string | null
          id?: string
          payload?: Json
        }
        Relationships: []
      }
      ai_settings: {
        Row: {
          api_key_encrypted: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          model: string | null
          provider: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          api_key_encrypted?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          model?: string | null
          provider?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          api_key_encrypted?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          model?: string | null
          provider?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          key: string
          value: Json | null
        }
        Insert: {
          key: string
          value?: Json | null
        }
        Update: {
          key?: string
          value?: Json | null
        }
        Relationships: []
      }
      bank_transactions: {
        Row: {
          amount: number | null
          bank_name: string | null
          company_id: string | null
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          is_reconciled: boolean | null
          raw_line: string | null
          type: string | null
        }
        Insert: {
          amount?: number | null
          bank_name?: string | null
          company_id?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          is_reconciled?: boolean | null
          raw_line?: string | null
          type?: string | null
        }
        Update: {
          amount?: number | null
          bank_name?: string | null
          company_id?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          is_reconciled?: boolean | null
          raw_line?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_transactions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      cclasstrib_items: {
        Row: {
          anexo: string | null
          applicable_ncm: string[] | null
          code: string
          created_at: string | null
          cst_ibs_cbs: string | null
          d_fim_vig: string | null
          d_ini_vig: string | null
          data_atualizacao: string | null
          desc_cst_ibs_cbs: string | null
          description: string | null
          id: string
          import_id: string | null
          ind_bpe: boolean | null
          ind_bpe_ta: boolean | null
          ind_bpe_tm: boolean | null
          ind_cte: boolean | null
          ind_cte_os: boolean | null
          ind_dere: boolean | null
          ind_g_cred_pres_oper: string | null
          ind_g_estorno_cred: string | null
          ind_g_mono_dif: string | null
          ind_g_mono_padrao: string | null
          ind_g_mono_ret: string | null
          ind_g_mono_reten: string | null
          ind_g_trib_regular: string | null
          ind_nf3e: boolean | null
          ind_nfag: boolean | null
          ind_nfce: boolean | null
          ind_nfcom: boolean | null
          ind_nfe: boolean | null
          ind_nfe_abi: boolean | null
          ind_nfgas: boolean | null
          ind_nfse: boolean | null
          ind_nfse_via: boolean | null
          is_active: boolean | null
          lc_214_25: string | null
          lc_redacao: string | null
          link: string | null
          name: string
          p_red_cbs: number | null
          p_red_ibs: number | null
          tipo_aliquota: string | null
          type: string | null
        }
        Insert: {
          anexo?: string | null
          applicable_ncm?: string[] | null
          code: string
          created_at?: string | null
          cst_ibs_cbs?: string | null
          d_fim_vig?: string | null
          d_ini_vig?: string | null
          data_atualizacao?: string | null
          desc_cst_ibs_cbs?: string | null
          description?: string | null
          id?: string
          import_id?: string | null
          ind_bpe?: boolean | null
          ind_bpe_ta?: boolean | null
          ind_bpe_tm?: boolean | null
          ind_cte?: boolean | null
          ind_cte_os?: boolean | null
          ind_dere?: boolean | null
          ind_g_cred_pres_oper?: string | null
          ind_g_estorno_cred?: string | null
          ind_g_mono_dif?: string | null
          ind_g_mono_padrao?: string | null
          ind_g_mono_ret?: string | null
          ind_g_mono_reten?: string | null
          ind_g_trib_regular?: string | null
          ind_nf3e?: boolean | null
          ind_nfag?: boolean | null
          ind_nfce?: boolean | null
          ind_nfcom?: boolean | null
          ind_nfe?: boolean | null
          ind_nfe_abi?: boolean | null
          ind_nfgas?: boolean | null
          ind_nfse?: boolean | null
          ind_nfse_via?: boolean | null
          is_active?: boolean | null
          lc_214_25?: string | null
          lc_redacao?: string | null
          link?: string | null
          name: string
          p_red_cbs?: number | null
          p_red_ibs?: number | null
          tipo_aliquota?: string | null
          type?: string | null
        }
        Update: {
          anexo?: string | null
          applicable_ncm?: string[] | null
          code?: string
          created_at?: string | null
          cst_ibs_cbs?: string | null
          d_fim_vig?: string | null
          d_ini_vig?: string | null
          data_atualizacao?: string | null
          desc_cst_ibs_cbs?: string | null
          description?: string | null
          id?: string
          import_id?: string | null
          ind_bpe?: boolean | null
          ind_bpe_ta?: boolean | null
          ind_bpe_tm?: boolean | null
          ind_cte?: boolean | null
          ind_cte_os?: boolean | null
          ind_dere?: boolean | null
          ind_g_cred_pres_oper?: string | null
          ind_g_estorno_cred?: string | null
          ind_g_mono_dif?: string | null
          ind_g_mono_padrao?: string | null
          ind_g_mono_ret?: string | null
          ind_g_mono_reten?: string | null
          ind_g_trib_regular?: string | null
          ind_nf3e?: boolean | null
          ind_nfag?: boolean | null
          ind_nfce?: boolean | null
          ind_nfcom?: boolean | null
          ind_nfe?: boolean | null
          ind_nfe_abi?: boolean | null
          ind_nfgas?: boolean | null
          ind_nfse?: boolean | null
          ind_nfse_via?: boolean | null
          is_active?: boolean | null
          lc_214_25?: string | null
          lc_redacao?: string | null
          link?: string | null
          name?: string
          p_red_cbs?: number | null
          p_red_ibs?: number | null
          tipo_aliquota?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cclasstrib_items_import_id_fkey"
            columns: ["import_id"]
            isOneToOne: false
            referencedRelation: "imports"
            referencedColumns: ["id"]
          },
        ]
      }
      ccredpres_items: {
        Row: {
          aliquota_cbs: number | null
          aliquota_ibs: number | null
          apropria_via_evento: boolean | null
          apropria_via_nf: boolean | null
          c_class_nota_referenciada: string | null
          code: string
          created_at: string | null
          d_fim_vig_cbs: string | null
          d_fim_vig_ibs: string | null
          d_ini_vig_cbs: string | null
          d_ini_vig_ibs: string | null
          description: string
          id: string
          import_id: string | null
          ind_deduz_cred_pres: string | null
          ind_g_cbs_cred_pres: string | null
          ind_g_ibs_cred_pres: string | null
          is_active: boolean | null
          lc_214_ref: string | null
          p_aliq_cred_pres_cbs: number | null
          p_aliq_cred_pres_ibs: number | null
        }
        Insert: {
          aliquota_cbs?: number | null
          aliquota_ibs?: number | null
          apropria_via_evento?: boolean | null
          apropria_via_nf?: boolean | null
          c_class_nota_referenciada?: string | null
          code: string
          created_at?: string | null
          d_fim_vig_cbs?: string | null
          d_fim_vig_ibs?: string | null
          d_ini_vig_cbs?: string | null
          d_ini_vig_ibs?: string | null
          description: string
          id?: string
          import_id?: string | null
          ind_deduz_cred_pres?: string | null
          ind_g_cbs_cred_pres?: string | null
          ind_g_ibs_cred_pres?: string | null
          is_active?: boolean | null
          lc_214_ref?: string | null
          p_aliq_cred_pres_cbs?: number | null
          p_aliq_cred_pres_ibs?: number | null
        }
        Update: {
          aliquota_cbs?: number | null
          aliquota_ibs?: number | null
          apropria_via_evento?: boolean | null
          apropria_via_nf?: boolean | null
          c_class_nota_referenciada?: string | null
          code?: string
          created_at?: string | null
          d_fim_vig_cbs?: string | null
          d_fim_vig_ibs?: string | null
          d_ini_vig_cbs?: string | null
          d_ini_vig_ibs?: string | null
          description?: string
          id?: string
          import_id?: string | null
          ind_deduz_cred_pres?: string | null
          ind_g_cbs_cred_pres?: string | null
          ind_g_ibs_cred_pres?: string | null
          is_active?: boolean | null
          lc_214_ref?: string | null
          p_aliq_cred_pres_cbs?: number | null
          p_aliq_cred_pres_ibs?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ccredpres_items_import_id_fkey"
            columns: ["import_id"]
            isOneToOne: false
            referencedRelation: "imports"
            referencedColumns: ["id"]
          },
        ]
      }
      cliente_scores: {
        Row: {
          cliente_codigo: number
          cliente_nome: string | null
          created_at: string
          id: string
          media_dias_atraso: number | null
          score_adimplencia: number | null
          titulos_pagos: number | null
          titulos_pagos_com_atraso: number | null
          titulos_pagos_em_dia: number | null
          titulos_vencidos: number | null
          total_titulos: number | null
          ultima_atualizacao: string
          updated_at: string
        }
        Insert: {
          cliente_codigo: number
          cliente_nome?: string | null
          created_at?: string
          id?: string
          media_dias_atraso?: number | null
          score_adimplencia?: number | null
          titulos_pagos?: number | null
          titulos_pagos_com_atraso?: number | null
          titulos_pagos_em_dia?: number | null
          titulos_vencidos?: number | null
          total_titulos?: number | null
          ultima_atualizacao?: string
          updated_at?: string
        }
        Update: {
          cliente_codigo?: number
          cliente_nome?: string | null
          created_at?: string
          id?: string
          media_dias_atraso?: number | null
          score_adimplencia?: number | null
          titulos_pagos?: number | null
          titulos_pagos_com_atraso?: number | null
          titulos_pagos_em_dia?: number | null
          titulos_vencidos?: number | null
          total_titulos?: number | null
          ultima_atualizacao?: string
          updated_at?: string
        }
        Relationships: []
      }
      clientes: {
        Row: {
          ativo: boolean | null
          bairro: string | null
          celular: string | null
          cep: string | null
          cidade: string | null
          cnpj_cpf: string | null
          codigo_cliente_integracao: string | null
          codigo_cliente_omie: number
          complemento: string | null
          created_at: string
          email: string | null
          endereco: string | null
          estado: string | null
          grupo_id: string | null
          id: string
          inscricao_estadual: string | null
          nome_fantasia: string | null
          numero: string | null
          razao_social: string
          telefone: string | null
          ultima_sincronizacao: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean | null
          bairro?: string | null
          celular?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj_cpf?: string | null
          codigo_cliente_integracao?: string | null
          codigo_cliente_omie: number
          complemento?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          grupo_id?: string | null
          id?: string
          inscricao_estadual?: string | null
          nome_fantasia?: string | null
          numero?: string | null
          razao_social: string
          telefone?: string | null
          ultima_sincronizacao?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean | null
          bairro?: string | null
          celular?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj_cpf?: string | null
          codigo_cliente_integracao?: string | null
          codigo_cliente_omie?: number
          complemento?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          grupo_id?: string | null
          id?: string
          inscricao_estadual?: string | null
          nome_fantasia?: string | null
          numero?: string | null
          razao_social?: string
          telefone?: string | null
          ultima_sincronizacao?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clientes_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "grupos_empresariais"
            referencedColumns: ["id"]
          },
        ]
      }
      cnae_items: {
        Row: {
          classe: string | null
          code: string
          created_at: string | null
          description: string
          division: string | null
          grupo: string | null
          id: string
          import_id: string | null
          is_active: boolean | null
          section: string | null
          subclasse: string | null
        }
        Insert: {
          classe?: string | null
          code: string
          created_at?: string | null
          description: string
          division?: string | null
          grupo?: string | null
          id?: string
          import_id?: string | null
          is_active?: boolean | null
          section?: string | null
          subclasse?: string | null
        }
        Update: {
          classe?: string | null
          code?: string
          created_at?: string | null
          description?: string
          division?: string | null
          grupo?: string | null
          id?: string
          import_id?: string | null
          is_active?: boolean | null
          section?: string | null
          subclasse?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cnae_items_import_id_fkey"
            columns: ["import_id"]
            isOneToOne: false
            referencedRelation: "imports"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          ai_guidelines: Json | null
          ai_learning_history: Json | null
          chart_of_accounts: Json | null
          cnpj: string | null
          created_at: string | null
          email: string | null
          id: string
          industry: string | null
          is_default: boolean | null
          name: string
          nickname: string | null
          phone: string | null
          rules: Json | null
          state_registration: string | null
          tax_id: string
        }
        Insert: {
          address?: string | null
          ai_guidelines?: Json | null
          ai_learning_history?: Json | null
          chart_of_accounts?: Json | null
          cnpj?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          is_default?: boolean | null
          name: string
          nickname?: string | null
          phone?: string | null
          rules?: Json | null
          state_registration?: string | null
          tax_id: string
        }
        Update: {
          address?: string | null
          ai_guidelines?: Json | null
          ai_learning_history?: Json | null
          chart_of_accounts?: Json | null
          cnpj?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          is_default?: boolean | null
          name?: string
          nickname?: string | null
          phone?: string | null
          rules?: Json | null
          state_registration?: string | null
          tax_id?: string
        }
        Relationships: []
      }
      company_settings: {
        Row: {
          accent_color: string | null
          address: string | null
          card_style: string | null
          city: string | null
          cnpj: string | null
          company_name: string | null
          created_at: string
          document_layout: string | null
          email: string | null
          id: string
          logo_url: string | null
          phone: string | null
          primary_color: string | null
          secondary_color: string | null
          sidebar_style: string | null
          site_density: string | null
          site_mode: string | null
          site_theme: string | null
          state: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          accent_color?: string | null
          address?: string | null
          card_style?: string | null
          city?: string | null
          cnpj?: string | null
          company_name?: string | null
          created_at?: string
          document_layout?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          phone?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          sidebar_style?: string | null
          site_density?: string | null
          site_mode?: string | null
          site_theme?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          accent_color?: string | null
          address?: string | null
          card_style?: string | null
          city?: string | null
          cnpj?: string | null
          company_name?: string | null
          created_at?: string
          document_layout?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          phone?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          sidebar_style?: string | null
          site_density?: string | null
          site_mode?: string | null
          site_theme?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      conta_corrente_movimentacoes: {
        Row: {
          acordo_id: string | null
          baixado_omie: boolean
          categoria: string
          cliente_codigo: number
          created_at: string
          created_by: string | null
          data_movimento: string
          descricao: string
          id: string
          referencia_omie: number | null
          tipo: string
          updated_at: string
          valor: number
        }
        Insert: {
          acordo_id?: string | null
          baixado_omie?: boolean
          categoria: string
          cliente_codigo: number
          created_at?: string
          created_by?: string | null
          data_movimento?: string
          descricao: string
          id?: string
          referencia_omie?: number | null
          tipo: string
          updated_at?: string
          valor: number
        }
        Update: {
          acordo_id?: string | null
          baixado_omie?: boolean
          categoria?: string
          cliente_codigo?: number
          created_at?: string
          created_by?: string | null
          data_movimento?: string
          descricao?: string
          id?: string
          referencia_omie?: number | null
          tipo?: string
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "conta_corrente_movimentacoes_acordo_id_fkey"
            columns: ["acordo_id"]
            isOneToOne: false
            referencedRelation: "acordos_negociacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          alternative_name: string | null
          created_at: string | null
          data: Json | null
          id: string
          is_group: boolean | null
          last_synced_at: string
          name: string | null
          person_id: string | null
          person_name: string | null
          phone: string | null
          service_id: string | null
          service_name: string | null
          status: string | null
        }
        Insert: {
          alternative_name?: string | null
          created_at?: string | null
          data?: Json | null
          id: string
          is_group?: boolean | null
          last_synced_at?: string
          name?: string | null
          person_id?: string | null
          person_name?: string | null
          phone?: string | null
          service_id?: string | null
          service_name?: string | null
          status?: string | null
        }
        Update: {
          alternative_name?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          is_group?: boolean | null
          last_synced_at?: string
          name?: string | null
          person_id?: string | null
          person_name?: string | null
          phone?: string | null
          service_id?: string | null
          service_name?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      correlation_decisions: {
        Row: {
          created_at: string | null
          data_source_versions: Json | null
          decision_type: string
          id: string
          query_id: string
          selected_code: string | null
          selected_name: string | null
          suggestion_id: string | null
          user_id: string
          user_notes: string | null
        }
        Insert: {
          created_at?: string | null
          data_source_versions?: Json | null
          decision_type: string
          id?: string
          query_id: string
          selected_code?: string | null
          selected_name?: string | null
          suggestion_id?: string | null
          user_id: string
          user_notes?: string | null
        }
        Update: {
          created_at?: string | null
          data_source_versions?: Json | null
          decision_type?: string
          id?: string
          query_id?: string
          selected_code?: string | null
          selected_name?: string | null
          suggestion_id?: string | null
          user_id?: string
          user_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "correlation_decisions_query_id_fkey"
            columns: ["query_id"]
            isOneToOne: false
            referencedRelation: "correlation_queries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "correlation_decisions_suggestion_id_fkey"
            columns: ["suggestion_id"]
            isOneToOne: false
            referencedRelation: "correlation_suggestions"
            referencedColumns: ["id"]
          },
        ]
      }
      correlation_queries: {
        Row: {
          clarification_questions: Json | null
          created_at: string | null
          id: string
          input_code: string | null
          input_description: string
          input_flags: Json | null
          query_type: string
          status: string | null
          user_id: string
        }
        Insert: {
          clarification_questions?: Json | null
          created_at?: string | null
          id?: string
          input_code?: string | null
          input_description: string
          input_flags?: Json | null
          query_type: string
          status?: string | null
          user_id: string
        }
        Update: {
          clarification_questions?: Json | null
          created_at?: string | null
          id?: string
          input_code?: string | null
          input_description?: string
          input_flags?: Json | null
          query_type?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      correlation_suggestions: {
        Row: {
          cclasstrib: string | null
          cclasstrib_name: string | null
          created_at: string | null
          id: string
          justification: string | null
          metadata: Json | null
          query_id: string
          rank: number
          score: number | null
          sources_used: Json | null
          suggested_code: string
          suggested_name: string | null
        }
        Insert: {
          cclasstrib?: string | null
          cclasstrib_name?: string | null
          created_at?: string | null
          id?: string
          justification?: string | null
          metadata?: Json | null
          query_id: string
          rank: number
          score?: number | null
          sources_used?: Json | null
          suggested_code: string
          suggested_name?: string | null
        }
        Update: {
          cclasstrib?: string | null
          cclasstrib_name?: string | null
          created_at?: string | null
          id?: string
          justification?: string | null
          metadata?: Json | null
          query_id?: string
          rank?: number
          score?: number | null
          sources_used?: Json | null
          suggested_code?: string
          suggested_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "correlation_suggestions_query_id_fkey"
            columns: ["query_id"]
            isOneToOne: false
            referencedRelation: "correlation_queries"
            referencedColumns: ["id"]
          },
        ]
      }
      cst_items: {
        Row: {
          ajuste_competencia: boolean | null
          cod_classificacao_trib: string | null
          code: string
          created_at: string | null
          cred_presumido_ibs_zfm: boolean | null
          credito_presumido: boolean | null
          desc_cod_classificacao_trib: string | null
          description: string
          diferimento: boolean | null
          estorno_credito: boolean | null
          exige_tributacao: boolean | null
          id: string
          import_id: string | null
          is_active: boolean | null
          monofasica: boolean | null
          perc_reducao_cbs: number | null
          perc_reducao_ibs: number | null
          reducao_aliquota: boolean | null
          reducao_bc_cst: boolean | null
          tipo_aliquota: string | null
          transferencia_credito: boolean | null
          trib_monofasica_comb_diferimento: boolean | null
          trib_monofasica_normal: boolean | null
          trib_monofasica_retencao: boolean | null
          trib_monofasica_retida_ant: boolean | null
          tributacao_regular: boolean | null
        }
        Insert: {
          ajuste_competencia?: boolean | null
          cod_classificacao_trib?: string | null
          code: string
          created_at?: string | null
          cred_presumido_ibs_zfm?: boolean | null
          credito_presumido?: boolean | null
          desc_cod_classificacao_trib?: string | null
          description: string
          diferimento?: boolean | null
          estorno_credito?: boolean | null
          exige_tributacao?: boolean | null
          id?: string
          import_id?: string | null
          is_active?: boolean | null
          monofasica?: boolean | null
          perc_reducao_cbs?: number | null
          perc_reducao_ibs?: number | null
          reducao_aliquota?: boolean | null
          reducao_bc_cst?: boolean | null
          tipo_aliquota?: string | null
          transferencia_credito?: boolean | null
          trib_monofasica_comb_diferimento?: boolean | null
          trib_monofasica_normal?: boolean | null
          trib_monofasica_retencao?: boolean | null
          trib_monofasica_retida_ant?: boolean | null
          tributacao_regular?: boolean | null
        }
        Update: {
          ajuste_competencia?: boolean | null
          cod_classificacao_trib?: string | null
          code?: string
          created_at?: string | null
          cred_presumido_ibs_zfm?: boolean | null
          credito_presumido?: boolean | null
          desc_cod_classificacao_trib?: string | null
          description?: string
          diferimento?: boolean | null
          estorno_credito?: boolean | null
          exige_tributacao?: boolean | null
          id?: string
          import_id?: string | null
          is_active?: boolean | null
          monofasica?: boolean | null
          perc_reducao_cbs?: number | null
          perc_reducao_ibs?: number | null
          reducao_aliquota?: boolean | null
          reducao_bc_cst?: boolean | null
          tipo_aliquota?: string | null
          transferencia_credito?: boolean | null
          trib_monofasica_comb_diferimento?: boolean | null
          trib_monofasica_normal?: boolean | null
          trib_monofasica_retencao?: boolean | null
          trib_monofasica_retida_ant?: boolean | null
          tributacao_regular?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "cst_items_import_id_fkey"
            columns: ["import_id"]
            isOneToOne: false
            referencedRelation: "imports"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_exclusive_tools: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string
          display_order: number
          icon: string | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description: string
          display_order: number
          icon?: string | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string
          display_order?: number
          icon?: string | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      customer_transactions: {
        Row: {
          created_at: string | null
          customer_id: string | null
          date: string | null
          id: string
          invoice_number: string | null
          type: string | null
          value: number | null
          vehicle_description: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          date?: string | null
          id?: string
          invoice_number?: string | null
          type?: string | null
          value?: number | null
          vehicle_description?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          date?: string | null
          id?: string
          invoice_number?: string | null
          type?: string | null
          value?: number | null
          vehicle_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: string
          last_transaction_date: string | null
          name: string
          phone: string | null
          tax_id: string | null
          type: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_transaction_date?: string | null
          name: string
          phone?: string | null
          tax_id?: string | null
          type?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_transaction_date?: string | null
          name?: string
          phone?: string | null
          tax_id?: string | null
          type?: string | null
        }
        Relationships: []
      }
      data_sources: {
        Row: {
          category: string
          created_at: string | null
          file_path: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          module: string | null
          name: string
          type: string
          updated_at: string | null
          uploaded_by: string | null
          version: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          file_path?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          module?: string | null
          name: string
          type: string
          updated_at?: string | null
          uploaded_by?: string | null
          version?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          file_path?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          module?: string | null
          name?: string
          type?: string
          updated_at?: string | null
          uploaded_by?: string | null
          version?: string | null
        }
        Relationships: []
      }
      departments: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      grupos_empresariais: {
        Row: {
          cliente_faturamento_codigo: number
          created_at: string
          created_by: string | null
          id: string
          nome: string
          observacoes: string | null
          responsavel_contato: string | null
          responsavel_nome: string | null
          updated_at: string
        }
        Insert: {
          cliente_faturamento_codigo: number
          created_at?: string
          created_by?: string | null
          id?: string
          nome: string
          observacoes?: string | null
          responsavel_contato?: string | null
          responsavel_nome?: string | null
          updated_at?: string
        }
        Update: {
          cliente_faturamento_codigo?: number
          created_at?: string
          created_by?: string | null
          id?: string
          nome?: string
          observacoes?: string | null
          responsavel_contato?: string | null
          responsavel_nome?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      historico_pagamentos: {
        Row: {
          cliente_codigo: number
          cliente_nome: string | null
          created_at: string
          data_pagamento: string | null
          data_vencimento: string
          dias_atraso: number | null
          id: string
          numero_titulo: string | null
          status: string
          titulo_codigo: number
          updated_at: string
          valor_pago: number | null
          valor_titulo: number
        }
        Insert: {
          cliente_codigo: number
          cliente_nome?: string | null
          created_at?: string
          data_pagamento?: string | null
          data_vencimento: string
          dias_atraso?: number | null
          id?: string
          numero_titulo?: string | null
          status: string
          titulo_codigo: number
          updated_at?: string
          valor_pago?: number | null
          valor_titulo: number
        }
        Update: {
          cliente_codigo?: number
          cliente_nome?: string | null
          created_at?: string
          data_pagamento?: string | null
          data_vencimento?: string
          dias_atraso?: number | null
          id?: string
          numero_titulo?: string | null
          status?: string
          titulo_codigo?: number
          updated_at?: string
          valor_pago?: number | null
          valor_titulo?: number
        }
        Relationships: []
      }
      imports: {
        Row: {
          column_mapping: Json | null
          completed_at: string | null
          created_at: string | null
          data_source_id: string | null
          error_count: number | null
          errors: Json | null
          file_path: string | null
          id: string
          import_type: string | null
          imported_by: string | null
          module: string | null
          processed_rows: number | null
          started_at: string | null
          status: string | null
          total_rows: number | null
        }
        Insert: {
          column_mapping?: Json | null
          completed_at?: string | null
          created_at?: string | null
          data_source_id?: string | null
          error_count?: number | null
          errors?: Json | null
          file_path?: string | null
          id?: string
          import_type?: string | null
          imported_by?: string | null
          module?: string | null
          processed_rows?: number | null
          started_at?: string | null
          status?: string | null
          total_rows?: number | null
        }
        Update: {
          column_mapping?: Json | null
          completed_at?: string | null
          created_at?: string | null
          data_source_id?: string | null
          error_count?: number | null
          errors?: Json | null
          file_path?: string | null
          id?: string
          import_type?: string | null
          imported_by?: string | null
          module?: string | null
          processed_rows?: number | null
          started_at?: string | null
          status?: string | null
          total_rows?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "imports_data_source_id_fkey"
            columns: ["data_source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      lc116_items: {
        Row: {
          code: string
          created_at: string | null
          description: string
          id: string
          import_id: string | null
          is_active: boolean | null
          subitem: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description: string
          id?: string
          import_id?: string | null
          is_active?: boolean | null
          subitem?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string
          id?: string
          import_id?: string | null
          is_active?: boolean | null
          subitem?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lc116_items_import_id_fkey"
            columns: ["import_id"]
            isOneToOne: false
            referencedRelation: "imports"
            referencedColumns: ["id"]
          },
        ]
      }
      managed_cards: {
        Row: {
          card_type: string
          created_at: string | null
          created_by: string | null
          description: string
          display_order: number
          icon: string
          id: string
          internal_path: string | null
          is_active: boolean | null
          open_type: string | null
          title: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          card_type: string
          created_at?: string | null
          created_by?: string | null
          description: string
          display_order: number
          icon?: string
          id?: string
          internal_path?: string | null
          is_active?: boolean | null
          open_type?: string | null
          title: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          card_type?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          display_order?: number
          icon?: string
          id?: string
          internal_path?: string | null
          is_active?: boolean | null
          open_type?: string | null
          title?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      nbs_items: {
        Row: {
          code: string
          created_at: string | null
          description: string
          id: string
          import_id: string | null
          is_active: boolean | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description: string
          id?: string
          import_id?: string | null
          is_active?: boolean | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string
          id?: string
          import_id?: string | null
          is_active?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "nbs_items_import_id_fkey"
            columns: ["import_id"]
            isOneToOne: false
            referencedRelation: "imports"
            referencedColumns: ["id"]
          },
        ]
      }
      nbs_lc116_correlations: {
        Row: {
          cclasstrib: string | null
          cclasstrib_nome: string | null
          created_at: string | null
          exterior: boolean | null
          id: string
          import_id: string | null
          indicador_operacao: string | null
          is_active: boolean | null
          lc116_code: string | null
          lc116_id: string | null
          local_ibs: string | null
          nbs_code: string | null
          nbs_id: string | null
          prestacao_onerosa: boolean | null
        }
        Insert: {
          cclasstrib?: string | null
          cclasstrib_nome?: string | null
          created_at?: string | null
          exterior?: boolean | null
          id?: string
          import_id?: string | null
          indicador_operacao?: string | null
          is_active?: boolean | null
          lc116_code?: string | null
          lc116_id?: string | null
          local_ibs?: string | null
          nbs_code?: string | null
          nbs_id?: string | null
          prestacao_onerosa?: boolean | null
        }
        Update: {
          cclasstrib?: string | null
          cclasstrib_nome?: string | null
          created_at?: string | null
          exterior?: boolean | null
          id?: string
          import_id?: string | null
          indicador_operacao?: string | null
          is_active?: boolean | null
          lc116_code?: string | null
          lc116_id?: string | null
          local_ibs?: string | null
          nbs_code?: string | null
          nbs_id?: string | null
          prestacao_onerosa?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "nbs_lc116_correlations_import_id_fkey"
            columns: ["import_id"]
            isOneToOne: false
            referencedRelation: "imports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nbs_lc116_correlations_lc116_id_fkey"
            columns: ["lc116_id"]
            isOneToOne: false
            referencedRelation: "lc116_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nbs_lc116_correlations_nbs_id_fkey"
            columns: ["nbs_id"]
            isOneToOne: false
            referencedRelation: "nbs_items"
            referencedColumns: ["id"]
          },
        ]
      }
      ncm_cclasstrib_correlations: {
        Row: {
          c_cred_pres: string | null
          cclasstrib_code: string
          cclasstrib_name: string | null
          created_at: string | null
          cst: string | null
          id: string
          import_id: string | null
          is_active: boolean | null
          ncm_code: string
          other_fields: Json | null
        }
        Insert: {
          c_cred_pres?: string | null
          cclasstrib_code: string
          cclasstrib_name?: string | null
          created_at?: string | null
          cst?: string | null
          id?: string
          import_id?: string | null
          is_active?: boolean | null
          ncm_code: string
          other_fields?: Json | null
        }
        Update: {
          c_cred_pres?: string | null
          cclasstrib_code?: string
          cclasstrib_name?: string | null
          created_at?: string | null
          cst?: string | null
          id?: string
          import_id?: string | null
          is_active?: boolean | null
          ncm_code?: string
          other_fields?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "ncm_cclasstrib_correlations_import_id_fkey"
            columns: ["import_id"]
            isOneToOne: false
            referencedRelation: "imports"
            referencedColumns: ["id"]
          },
        ]
      }
      ncm_items: {
        Row: {
          ano: string | null
          ato_legal_inicio: string | null
          code: string
          created_at: string | null
          data_fim: string | null
          data_inicio: string | null
          description: string
          id: string
          import_id: string | null
          is_active: boolean | null
          numero: string | null
        }
        Insert: {
          ano?: string | null
          ato_legal_inicio?: string | null
          code: string
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          description: string
          id?: string
          import_id?: string | null
          is_active?: boolean | null
          numero?: string | null
        }
        Update: {
          ano?: string | null
          ato_legal_inicio?: string | null
          code?: string
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          description?: string
          id?: string
          import_id?: string | null
          is_active?: boolean | null
          numero?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ncm_items_import_id_fkey"
            columns: ["import_id"]
            isOneToOne: false
            referencedRelation: "imports"
            referencedColumns: ["id"]
          },
        ]
      }
      pdf_chunks: {
        Row: {
          chunk_index: number | null
          content: string
          created_at: string | null
          data_source_id: string | null
          document_type: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          page_number: number | null
          source_module: string | null
        }
        Insert: {
          chunk_index?: number | null
          content: string
          created_at?: string | null
          data_source_id?: string | null
          document_type?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          page_number?: number | null
          source_module?: string | null
        }
        Update: {
          chunk_index?: number | null
          content?: string
          created_at?: string | null
          data_source_id?: string | null
          document_type?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          page_number?: number | null
          source_module?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pdf_chunks_data_source_id_fkey"
            columns: ["data_source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      people: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string
          number: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name: string
          number?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          id: string
          name: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      signup_requests: {
        Row: {
          created_at: string
          email: string
          id: string
          requested_by_ip: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          requested_by_ip?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          requested_by_ip?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      titulo_agrupamentos: {
        Row: {
          cliente_codigo: number
          created_at: string
          created_by: string | null
          documento_principal: string | null
          documento_vinculado: string | null
          id: string
          observacao: string | null
          titulo_principal_codigo: number
          titulo_vinculado_codigo: number
          valor_vinculado: number | null
        }
        Insert: {
          cliente_codigo: number
          created_at?: string
          created_by?: string | null
          documento_principal?: string | null
          documento_vinculado?: string | null
          id?: string
          observacao?: string | null
          titulo_principal_codigo: number
          titulo_vinculado_codigo: number
          valor_vinculado?: number | null
        }
        Update: {
          cliente_codigo?: number
          created_at?: string
          created_by?: string | null
          documento_principal?: string | null
          documento_vinculado?: string | null
          id?: string
          observacao?: string | null
          titulo_principal_codigo?: number
          titulo_vinculado_codigo?: number
          valor_vinculado?: number | null
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string | null
          id: string
          item_description: string | null
          item_icon: string | null
          item_id: string
          item_name: string
          item_type: string
          item_url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_description?: string | null
          item_icon?: string | null
          item_id: string
          item_name: string
          item_type: string
          item_url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          item_description?: string | null
          item_icon?: string | null
          item_id?: string
          item_name?: string
          item_type?: string
          item_url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicle_documents: {
        Row: {
          category: string | null
          created_at: string | null
          data_base64: string | null
          description: string | null
          id: string
          mime_type: string | null
          name: string | null
          vehicle_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          data_base64?: string | null
          description?: string | null
          id: string
          mime_type?: string | null
          name?: string | null
          vehicle_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          data_base64?: string | null
          description?: string | null
          id?: string
          mime_type?: string | null
          name?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_documents_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_movements: {
        Row: {
          created_at: string | null
          date: string | null
          id: string
          invoice_number: string | null
          observation: string | null
          type: string | null
          value: number | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          id?: string
          invoice_number?: string | null
          observation?: string | null
          type?: string | null
          value?: number | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          id?: string
          invoice_number?: string | null
          observation?: string | null
          type?: string | null
          value?: number | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_movements_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          color: string | null
          company_id: string | null
          created_at: string | null
          description: string | null
          entry_invoice_number: string | null
          entry_tax_details: Json | null
          exit_invoice_number: string | null
          exit_tax_details: Json | null
          id: string
          make: string | null
          manufacturing_year: number | null
          model: string | null
          model_year: number | null
          plate: string | null
          product_code: string | null
          purchase_date: string | null
          purchase_price: number | null
          renavam: string | null
          sale_date: string | null
          sale_price: number | null
          status: string | null
          tax_config: Json | null
          vin: string | null
        }
        Insert: {
          color?: string | null
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          entry_invoice_number?: string | null
          entry_tax_details?: Json | null
          exit_invoice_number?: string | null
          exit_tax_details?: Json | null
          id?: string
          make?: string | null
          manufacturing_year?: number | null
          model?: string | null
          model_year?: number | null
          plate?: string | null
          product_code?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          renavam?: string | null
          sale_date?: string | null
          sale_price?: number | null
          status?: string | null
          tax_config?: Json | null
          vin?: string | null
        }
        Update: {
          color?: string | null
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          entry_invoice_number?: string | null
          entry_tax_details?: Json | null
          exit_invoice_number?: string | null
          exit_tax_details?: Json | null
          id?: string
          make?: string | null
          manufacturing_year?: number | null
          model?: string | null
          model_year?: number | null
          plate?: string | null
          product_code?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          renavam?: string | null
          sale_date?: string | null
          sale_price?: number | null
          status?: string | null
          tax_config?: Json | null
          vin?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_financial_access: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "financial_staff" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "financial_staff", "viewer"],
    },
  },
} as const
