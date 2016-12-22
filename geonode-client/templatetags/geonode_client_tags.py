from django import template

register = template.Library()


@register.inclusion_tag('geonode-client/map_view.html', takes_context=True)
def client_map_view_html(context, options=None):
    """
    Client Map View html template tag.
    """
    return context

@register.inclusion_tag('geonode-client/map_detail.html', takes_context=True)
def client_map_detail_view_html(context, options=None):
    """
    Client Map Detail View html template tag.
    """
    return context

@register.inclusion_tag('geonode-client/map_new.html', takes_context=True)
def client_map_new_html(context,options=None):
    """
    Client Map View html template tag.
    """
    return context

@register.inclusion_tag('geonode-client/layer_map.html', takes_context=True)
def client_layer_map_html(context, options=None):
    """
    Client Map View html template tag.
    """
    return context

@register.inclusion_tag('geonode-client/_client_composer_js.html', takes_context=True)
def client_composer_js(context, options=None):
    """
    React Client Composer js template tag.
    """
    return context

@register.inclusion_tag('geonode-client/_client_viewer_js.html', takes_context=True)
def client_viewer_js(context, options=None):
    """
    React client viewer js template tag.
    """
    return context
