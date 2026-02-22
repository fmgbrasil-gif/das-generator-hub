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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      client_certificates: {
        Row: {
          client_id: string
          created_at: string | null
          expiration_date: string | null
          id: string
          issuer: string | null
          notes: string | null
          password: string | null
          status: string | null
          type: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          expiration_date?: string | null
          id?: string
          issuer?: string | null
          notes?: string | null
          password?: string | null
          status?: string | null
          type?: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          expiration_date?: string | null
          id?: string
          issuer?: string | null
          notes?: string | null
          password?: string | null
          status?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_certificates_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_credentials: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          login: string | null
          notes: string | null
          password: string | null
          platform: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          login?: string | null
          notes?: string | null
          password?: string | null
          platform: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          login?: string | null
          notes?: string | null
          password?: string | null
          platform?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_credentials_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_permits: {
        Row: {
          client_id: string
          created_at: string | null
          document_number: string | null
          expiration_date: string | null
          id: string
          issue_date: string | null
          name: string
          notes: string | null
          status: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          document_number?: string | null
          expiration_date?: string | null
          id?: string
          issue_date?: string | null
          name: string
          notes?: string | null
          status?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          document_number?: string | null
          expiration_date?: string | null
          id?: string
          issue_date?: string | null
          name?: string
          notes?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_permits_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_proxies: {
        Row: {
          client_id: string
          created_at: string | null
          expiration_date: string | null
          id: string
          organ: string
          status: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          expiration_date?: string | null
          id?: string
          organ: string
          status?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          expiration_date?: string | null
          id?: string
          organ?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_proxies_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          business_group: string | null
          capital_social: number | null
          churn_reason: string | null
          city_state: string | null
          client_since: string | null
          cnae_main: string | null
          cnae_secondary: string[] | null
          cnpj: string | null
          code: string | null
          company_name: string | null
          company_size: string | null
          control_group: string | null
          created_at: string | null
          custom_fields: Json | null
          email: string | null
          fiscal_closing_method: string | null
          fiscal_responsible: string | null
          health_score: number | null
          id: string
          last_contact: string | null
          legal_nature: string | null
          mrr: number | null
          nickname: string | null
          obligation_profile: Json | null
          opening_date: string | null
          personnel_closing_method: string | null
          personnel_responsible: string | null
          phone: string | null
          segment: string | null
          situation: string | null
          state_registration: string | null
          tax_regime: string | null
          updated_at: string | null
        }
        Insert: {
          business_group?: string | null
          capital_social?: number | null
          churn_reason?: string | null
          city_state?: string | null
          client_since?: string | null
          cnae_main?: string | null
          cnae_secondary?: string[] | null
          cnpj?: string | null
          code?: string | null
          company_name?: string | null
          company_size?: string | null
          control_group?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          email?: string | null
          fiscal_closing_method?: string | null
          fiscal_responsible?: string | null
          health_score?: number | null
          id?: string
          last_contact?: string | null
          legal_nature?: string | null
          mrr?: number | null
          nickname?: string | null
          obligation_profile?: Json | null
          opening_date?: string | null
          personnel_closing_method?: string | null
          personnel_responsible?: string | null
          phone?: string | null
          segment?: string | null
          situation?: string | null
          state_registration?: string | null
          tax_regime?: string | null
          updated_at?: string | null
        }
        Update: {
          business_group?: string | null
          capital_social?: number | null
          churn_reason?: string | null
          city_state?: string | null
          client_since?: string | null
          cnae_main?: string | null
          cnae_secondary?: string[] | null
          cnpj?: string | null
          code?: string | null
          company_name?: string | null
          company_size?: string | null
          control_group?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          email?: string | null
          fiscal_closing_method?: string | null
          fiscal_responsible?: string | null
          health_score?: number | null
          id?: string
          last_contact?: string | null
          legal_nature?: string | null
          mrr?: number | null
          nickname?: string | null
          obligation_profile?: Json | null
          opening_date?: string | null
          personnel_closing_method?: string | null
          personnel_responsible?: string | null
          phone?: string | null
          segment?: string | null
          situation?: string | null
          state_registration?: string | null
          tax_regime?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      correcoes_xml: {
        Row: {
          created_at: string
          divergencias_por_imposto: Json | null
          empresa_id: string
          exportado_em: string | null
          id: string
          impostograma_arquivo: string | null
          impostograma_formato: string | null
          nfe_arquivos: Json
          status: string
          total_correcoes_aprovadas: number | null
          total_divergencias: number | null
          total_matches: number | null
          total_nfe_itens: number | null
          usuario_id: string
        }
        Insert: {
          created_at?: string
          divergencias_por_imposto?: Json | null
          empresa_id: string
          exportado_em?: string | null
          id?: string
          impostograma_arquivo?: string | null
          impostograma_formato?: string | null
          nfe_arquivos?: Json
          status?: string
          total_correcoes_aprovadas?: number | null
          total_divergencias?: number | null
          total_matches?: number | null
          total_nfe_itens?: number | null
          usuario_id: string
        }
        Update: {
          created_at?: string
          divergencias_por_imposto?: Json | null
          empresa_id?: string
          exportado_em?: string | null
          id?: string
          impostograma_arquivo?: string | null
          impostograma_formato?: string | null
          nfe_arquivos?: Json
          status?: string
          total_correcoes_aprovadas?: number | null
          total_divergencias?: number | null
          total_matches?: number | null
          total_nfe_itens?: number | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "correcoes_xml_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_exclusive_tools: {
        Row: {
          created_at: string | null
          description: string
          display_order: number
          icon: string
          id: string
          is_active: boolean
          title: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string
          display_order?: number
          icon?: string
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          display_order?: number
          icon?: string
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      departments: {
        Row: {
          color: string
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: Database["public"]["Enums"]["department_slug"]
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: Database["public"]["Enums"]["department_slug"]
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: Database["public"]["Enums"]["department_slug"]
        }
        Relationships: []
      }
      empresas: {
        Row: {
          ativa: boolean | null
          cnpj: string
          created_at: string | null
          created_by: string | null
          id: string
          inscricao_estadual: string | null
          nome_fantasia: string | null
          razao_social: string
          regime_tributario: string | null
          updated_at: string | null
        }
        Insert: {
          ativa?: boolean | null
          cnpj: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          inscricao_estadual?: string | null
          nome_fantasia?: string | null
          razao_social: string
          regime_tributario?: string | null
          updated_at?: string | null
        }
        Update: {
          ativa?: boolean | null
          cnpj?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          inscricao_estadual?: string | null
          nome_fantasia?: string | null
          razao_social?: string
          regime_tributario?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      grupos_fiscais: {
        Row: {
          aliq_cofins_entrada: number | null
          aliq_cofins_saida: number | null
          aliq_icms: number | null
          aliq_ipi: number | null
          aliq_pis_entrada: number | null
          aliq_pis_saida: number | null
          base_credito: string | null
          chave_grupo: string
          created_at: string | null
          cst_cofins_saida: string | null
          cst_icms_saida: string | null
          cst_ipi_entrada: string | null
          cst_ipi_saida: string | null
          cst_pis_entrada: string | null
          cst_pis_saida: string
          descricao: string
          empresa_id: string
          id: string
          importacao_id: string
          nat_rec_pis: string | null
          ordem: number | null
          selecionado: boolean | null
          sujeito_pis_cofins: string | null
          tipo_pis_cofins: string | null
          tipo_tributacao: string | null
          vinculo_credito: string | null
        }
        Insert: {
          aliq_cofins_entrada?: number | null
          aliq_cofins_saida?: number | null
          aliq_icms?: number | null
          aliq_ipi?: number | null
          aliq_pis_entrada?: number | null
          aliq_pis_saida?: number | null
          base_credito?: string | null
          chave_grupo: string
          created_at?: string | null
          cst_cofins_saida?: string | null
          cst_icms_saida?: string | null
          cst_ipi_entrada?: string | null
          cst_ipi_saida?: string | null
          cst_pis_entrada?: string | null
          cst_pis_saida: string
          descricao: string
          empresa_id: string
          id?: string
          importacao_id: string
          nat_rec_pis?: string | null
          ordem?: number | null
          selecionado?: boolean | null
          sujeito_pis_cofins?: string | null
          tipo_pis_cofins?: string | null
          tipo_tributacao?: string | null
          vinculo_credito?: string | null
        }
        Update: {
          aliq_cofins_entrada?: number | null
          aliq_cofins_saida?: number | null
          aliq_icms?: number | null
          aliq_ipi?: number | null
          aliq_pis_entrada?: number | null
          aliq_pis_saida?: number | null
          base_credito?: string | null
          chave_grupo?: string
          created_at?: string | null
          cst_cofins_saida?: string | null
          cst_icms_saida?: string | null
          cst_ipi_entrada?: string | null
          cst_ipi_saida?: string | null
          cst_pis_entrada?: string | null
          cst_pis_saida?: string
          descricao?: string
          empresa_id?: string
          id?: string
          importacao_id?: string
          nat_rec_pis?: string | null
          ordem?: number | null
          selecionado?: boolean | null
          sujeito_pis_cofins?: string | null
          tipo_pis_cofins?: string | null
          tipo_tributacao?: string | null
          vinculo_credito?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grupos_fiscais_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grupos_fiscais_importacao_id_fkey"
            columns: ["importacao_id"]
            isOneToOne: false
            referencedRelation: "importacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      importacoes: {
        Row: {
          created_at: string | null
          csv_gerado_em: string | null
          descricao_vigencia: string | null
          empresa_id: string
          id: string
          metadados: Json | null
          nome_arquivo: string
          status: string | null
          tamanho_arquivo: number | null
          total_duplicados_removidos: number | null
          total_grupos: number | null
          total_ncms: number | null
          total_ncms_exportados: number | null
          updated_at: string | null
          usuario_id: string
          vigencia: string | null
        }
        Insert: {
          created_at?: string | null
          csv_gerado_em?: string | null
          descricao_vigencia?: string | null
          empresa_id: string
          id?: string
          metadados?: Json | null
          nome_arquivo: string
          status?: string | null
          tamanho_arquivo?: number | null
          total_duplicados_removidos?: number | null
          total_grupos?: number | null
          total_ncms?: number | null
          total_ncms_exportados?: number | null
          updated_at?: string | null
          usuario_id: string
          vigencia?: string | null
        }
        Update: {
          created_at?: string | null
          csv_gerado_em?: string | null
          descricao_vigencia?: string | null
          empresa_id?: string
          id?: string
          metadados?: Json | null
          nome_arquivo?: string
          status?: string | null
          tamanho_arquivo?: number | null
          total_duplicados_removidos?: number | null
          total_grupos?: number | null
          total_ncms?: number | null
          total_ncms_exportados?: number | null
          updated_at?: string | null
          usuario_id?: string
          vigencia?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "importacoes_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      managed_cards: {
        Row: {
          card_type: string
          created_at: string | null
          description: string
          display_order: number
          icon: string
          id: string
          internal_path: string | null
          is_active: boolean
          open_type: string | null
          title: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          card_type: string
          created_at?: string | null
          description?: string
          display_order?: number
          icon?: string
          id?: string
          internal_path?: string | null
          is_active?: boolean
          open_type?: string | null
          title: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          card_type?: string
          created_at?: string | null
          description?: string
          display_order?: number
          icon?: string
          id?: string
          internal_path?: string | null
          is_active?: boolean
          open_type?: string | null
          title?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      mapeamentos_colunas_imp: {
        Row: {
          colunas_origem: string[] | null
          created_at: string | null
          empresa_id: string
          id: string
          mapa_colunas: Json
          updated_at: string | null
        }
        Insert: {
          colunas_origem?: string[] | null
          created_at?: string | null
          empresa_id: string
          id?: string
          mapa_colunas?: Json
          updated_at?: string | null
        }
        Update: {
          colunas_origem?: string[] | null
          created_at?: string | null
          empresa_id?: string
          id?: string
          mapa_colunas?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mapeamentos_colunas_imp_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: true
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      mapeamentos_xml: {
        Row: {
          ativa: boolean | null
          created_at: string | null
          empresa_id: string
          id: string
          impostograma_campos_disponiveis: Json | null
          nfe_campos_disponiveis: Json | null
          nome: string
          regras_comparacao: Json | null
          regras_matching: Json | null
          updated_at: string | null
        }
        Insert: {
          ativa?: boolean | null
          created_at?: string | null
          empresa_id: string
          id?: string
          impostograma_campos_disponiveis?: Json | null
          nfe_campos_disponiveis?: Json | null
          nome: string
          regras_comparacao?: Json | null
          regras_matching?: Json | null
          updated_at?: string | null
        }
        Update: {
          ativa?: boolean | null
          created_at?: string | null
          empresa_id?: string
          id?: string
          impostograma_campos_disponiveis?: Json | null
          nfe_campos_disponiveis?: Json | null
          nome?: string
          regras_comparacao?: Json | null
          regras_matching?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mapeamentos_xml_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      ncms: {
        Row: {
          cest: string | null
          created_at: string | null
          descricao_produto: string | null
          empresa_id: string
          grupo_fiscal_id: string
          id: string
          ncm: string
        }
        Insert: {
          cest?: string | null
          created_at?: string | null
          descricao_produto?: string | null
          empresa_id: string
          grupo_fiscal_id: string
          id?: string
          ncm: string
        }
        Update: {
          cest?: string | null
          created_at?: string | null
          descricao_produto?: string | null
          empresa_id?: string
          grupo_fiscal_id?: string
          id?: string
          ncm?: string
        }
        Relationships: [
          {
            foreignKeyName: "ncms_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ncms_grupo_fiscal_id_fkey"
            columns: ["grupo_fiscal_id"]
            isOneToOne: false
            referencedRelation: "grupos_fiscais"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_settings: {
        Row: {
          id: number
          logo_url: string | null
          organization_name: string | null
          updated_at: string | null
        }
        Insert: {
          id?: number
          logo_url?: string | null
          organization_name?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: number
          logo_url?: string | null
          organization_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      perfis: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          nome_completo: string | null
          ultima_empresa_id: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          nome_completo?: string | null
          ultima_empresa_id?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          nome_completo?: string | null
          ultima_empresa_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "perfis_ultima_empresa_fk"
            columns: ["ultima_empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      produtos_impostograma: {
        Row: {
          cest: string | null
          created_at: string | null
          dados_completos: Json | null
          dados_normalizados: Json
          descricao: string | null
          ean: string | null
          empresa_id: string
          id: string
          ncm: string
          updated_at: string | null
        }
        Insert: {
          cest?: string | null
          created_at?: string | null
          dados_completos?: Json | null
          dados_normalizados: Json
          descricao?: string | null
          ean?: string | null
          empresa_id: string
          id?: string
          ncm: string
          updated_at?: string | null
        }
        Update: {
          cest?: string | null
          created_at?: string | null
          dados_completos?: Json | null
          dados_normalizados?: Json
          descricao?: string | null
          ean?: string | null
          empresa_id?: string
          id?: string
          ncm?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "produtos_impostograma_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      regras_entrada: {
        Row: {
          ativa: boolean | null
          created_at: string | null
          empresa_id: string
          id: string
          nome: string | null
          regras: Json
          updated_at: string | null
        }
        Insert: {
          ativa?: boolean | null
          created_at?: string | null
          empresa_id: string
          id?: string
          nome?: string | null
          regras?: Json
          updated_at?: string | null
        }
        Update: {
          ativa?: boolean | null
          created_at?: string | null
          empresa_id?: string
          id?: string
          nome?: string | null
          regras?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regras_entrada_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      user_departments: {
        Row: {
          created_at: string
          department_id: string
          id: string
          is_primary: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          department_id: string
          id?: string
          is_primary?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          department_id?: string
          id?: string
          is_primary?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_departments_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_departments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      usuario_empresas: {
        Row: {
          created_at: string | null
          empresa_id: string
          id: string
          papel: string | null
          usuario_id: string
        }
        Insert: {
          created_at?: string | null
          empresa_id: string
          id?: string
          papel?: string | null
          usuario_id: string
        }
        Update: {
          created_at?: string | null
          empresa_id?: string
          id?: string
          papel?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuario_empresas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
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
      user_has_access_to_empresa: {
        Args: { p_empresa_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "viewer" | "director" | "employee" | "financial_staff"
      checklist_item_status: "pending" | "in_progress" | "completed" | "skipped"
      client_status: "onboarding" | "active" | "inactive" | "suspended"
      department_slug:
        | "fiscal"
        | "contabil"
        | "pessoal"
        | "financeiro"
        | "legalizacao"
      event_type:
        | "meeting"
        | "phone_call"
        | "email"
        | "document_sent"
        | "document_received"
        | "issue"
        | "resolution"
        | "observation"
        | "onboarding_step"
        | "other"
      onboarding_target:
        | "pj_simples"
        | "pj_presumido"
        | "pj_real"
        | "pf"
        | "mei"
      person_type: "pf" | "pj"
      recurrence_type: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
      task_priority: "low" | "medium" | "high" | "urgent"
      task_status:
        | "pending"
        | "in_progress"
        | "completed"
        | "overdue"
        | "cancelled"
      tax_regime: "simples_nacional" | "lucro_presumido" | "lucro_real" | "mei"
      user_role: "admin" | "manager" | "collaborator"
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
      app_role: ["admin", "viewer", "director", "employee", "financial_staff"],
      checklist_item_status: ["pending", "in_progress", "completed", "skipped"],
      client_status: ["onboarding", "active", "inactive", "suspended"],
      department_slug: [
        "fiscal",
        "contabil",
        "pessoal",
        "financeiro",
        "legalizacao",
      ],
      event_type: [
        "meeting",
        "phone_call",
        "email",
        "document_sent",
        "document_received",
        "issue",
        "resolution",
        "observation",
        "onboarding_step",
        "other",
      ],
      onboarding_target: ["pj_simples", "pj_presumido", "pj_real", "pf", "mei"],
      person_type: ["pf", "pj"],
      recurrence_type: ["daily", "weekly", "monthly", "quarterly", "yearly"],
      task_priority: ["low", "medium", "high", "urgent"],
      task_status: [
        "pending",
        "in_progress",
        "completed",
        "overdue",
        "cancelled",
      ],
      tax_regime: ["simples_nacional", "lucro_presumido", "lucro_real", "mei"],
      user_role: ["admin", "manager", "collaborator"],
    },
  },
} as const
